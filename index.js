import { v4 as uuidv4 } from 'uuid'
import fs from "fs"
import YAML from 'yaml'
import { Kafka } from 'kafkajs'
import { format, } from 'date-fns'
import { loggMottattSpørsmål, loggPubliseringAvSvar, logPublishingOfAnswer, logRecievedQuestion } from './loggføring'

let producer
let teamnavn
let topic

let ignorerteKategorierListe = []

const lastTilgangTilKafkaTopic = async (lagnavn, ignorerteKategorier) => {
    const leesahCertsSomJSON = YAML.parse(fs.readFileSync("./leesah-certs.yaml", "utf-8"))

    const kafka = new Kafka({
        clientId: `leesah-game-${lagnavn}`,
        brokers: [`${leesahCertsSomJSON.broker}:26484`],
        ssl: {
            rejectUnauthorized: false,
            ca: [leesahCertsSomJSON.ca],
            key: leesahCertsSomJSON.user.access_key,
            cert: leesahCertsSomJSON.user.access_cert,
        }
    })

    topic = leesahCertsSomJSON?.topics[0];

    const consumer = kafka.consumer({ groupId: uuidv4() })
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })

    producer = kafka.producer();
    await producer.connect();

    teamnavn = lagnavn
    ignorerteKategorierListe = [...ignorerteKategorier]

    return { consumer };
}

export const lastKafka = async (lagnavn, ignorerteKategorier) => {
    console.log("🚀 Starter opp...")

    try {
        return await lastTilgangTilKafkaTopic(lagnavn, ignorerteKategorier)
    } catch (e) {
        console.error(`Feil i lastingen av kafka: ${e}`)
    }
}

export const loadKafka = async (teamName, ignoredCategories) => {
    console.log("🚀 Starting up...")

    try {
        return await lastTilgangTilKafkaTopic(teamName, ignoredCategories)
    } catch (e) {
        console.error(`⛈️ Error during the loading of kafka: ${e}`)
    }
}



export const spørsmålFraHendelse = (hendelse) => {
    if (hendelse.value) {
        const parsetHendelse = JSON.parse(hendelse.value?.toString())
        if (parsetHendelse['@event_name'] === 'SPØRSMÅL') {
            const spm = {
                type: parsetHendelse['@event_name'],
                kategori: parsetHendelse.kategori,
                spørsmål: parsetHendelse.spørsmål,
                svarformat: parsetHendelse.svarformat,
                dokumentasjon: parsetHendelse.dokumentasjon,
                spørsmålId: parsetHendelse.spørsmålId,
            }
            if (!ignorerteKategorierListe.includes(spm.kategori)) {
                loggMottattSpørsmål(spm)
            }

            return spm
        } else {
            return undefined
        }
    } else {
        return undefined
    }
}

export const questionFromEvent = (event) => {
    if (event.value) {
        const parsedEvent = JSON.parse(event.value?.toString())
        if (parsedEvent['@event_name'] === 'SPØRSMÅL') {
            const question = {
                type: parsedEvent['@event_name'],
                kategori: parsedEvent.kategori,
                spørsmål: parsedEvent.spørsmål,
                svarformat: parsedEvent.svarformat,
                dokumentasjon: parsedEvent.dokumentasjon,
                spørsmålId: parsedEvent.spørsmålId,
            }
            if (!ignorerteKategorierListe.includes(question.kategori)) {
                logRecievedQuestion(question)
            }
        } else {
            return undefined
        }
    } else {
        return undefined
    }
}

export const publishAnswer = async (question, answer) => {
    const ans = {
        kategori: question.kategori,
        svar: answer,
        lagnavn: teamnavn,
        spørsmålId: question.spørsmålId,
        svarId: uuidv4(),
        '@event_name': 'SVAR',
    }

    await producer.send({
        topic,
        messages: [{
            value: JSON.stringify(ans)
        }]
    })

    if (!ignorerteKategorierListe.includes(spørsmål.kategori)) {
        logPublishingOfAnswer(ans)
    }
}

export const publiserSvar = async (spørsmål, svar) => {
    const svr = {
        kategori: spørsmål.kategori,
        svar,
        lagnavn: teamnavn,
        spørsmålId: spørsmål.spørsmålId,
        svarId: uuidv4(),
        '@event_name': 'SVAR',
    }

    await producer.send({
        topic,
        messages: [{
            value: JSON.stringify(svr)
        }]
    })

    if (!ignorerteKategorierListe.includes(spørsmål.kategori)) {
        loggPubliseringAvSvar(svr)
    }
}
