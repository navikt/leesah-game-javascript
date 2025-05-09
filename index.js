import { v4 as uuidv4 } from 'uuid'
import fs from "fs"
import YAML from 'yaml'
import { Kafka } from 'kafkajs'

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
        if (parsetHendelse.type === 'SPØRSMÅL') {
            const spm = {
                type: parsetHendelse.type,
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

        if (parsedEvent.type === 'SPØRSMÅL') {
            const question = {
                type: parsedEvent.type,
                category: parsedEvent.kategori,
                question: parsedEvent.spørsmål,
                answerFormat: parsedEvent.svarformat,
                documentation: parsedEvent.dokumentasjon,
                questionId: parsedEvent.spørsmålId,
            }
            if (!ignorerteKategorierListe.includes(question.kategori)) {
                logRecievedQuestion(question)
            }

            return question
        } else {
            return undefined
        }
    } else {
        return undefined
    }
}

export const publishAnswer = async (question, answer) => {
    const answerId = uuidv4()

    const ans = createAnswerObject(question, answer, answerId, teamnavn)

    await producer.send({
        topic,
        messages: [{
            value: JSON.stringify(ans)
        }]
    })

    if (!ignorerteKategorierListe.includes(ans.category)) {
        logPublishingOfAnswer({
            type: 'ANSWER',
            category: question.category,
            answer,
            teamName: teamnavn,
            questionId: question.questionId,
            answerId,
        })
    }
}

export const createAnswerObject = (question, answer, answerId, teamName) => {
    return {
        "@event_name": "SVAR",
        type: 'SVAR',
        kategori: question.category,
        svar: answer,
        lagnavn: teamName,
        spørsmålId: question.questionId,
        svarId: answerId
    }
}

export const publiserSvar = async (spørsmål, svar) => {
    const svarId = uuidv4()

    const svr = lagSvarObjekt(spørsmål, svar, svarId, teamnavn)

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

export const lagSvarObjekt = (spørsmål, svar, svarId, teamnavn) => {
    return {
        "@event_name": "SVAR",
        type: 'SVAR',
        kategori: spørsmål.kategori,
        svar,
        lagnavn: teamnavn,
        spørsmålId: spørsmål.spørsmålId,
        svarId,
    }
}


const loggMottattSpørsmål = (spørsmål) => {
    console.log(`📥 Mottok spørsmål: ${JSON.stringify({
        kategori: spørsmål.kategori,
        spørsmål: spørsmål.spørsmål,
        svarformat: spørsmål.svarformat,
        dokumentasjon: spørsmål.dokumentasjon,
        spørsmålId: spørsmål.spørsmålId,
    })}`)
}

const logRecievedQuestion = (question) => {
    console.log(`📥 Recieved question: ${JSON.stringify({
        category: question.category,
        question: question.question,
        answerFormat: question.answerFormat,
        documentation: question.documentation,
        questionId: question.questionId
    })}`)
}

const loggPubliseringAvSvar = (svar) => {
    console.log(`📤 Publisert svar: ${JSON.stringify({
        kategori: svar.kategori,
        svar: svar.svar,
        lagnavn: svar.lagnavn,
        spørsmålId: svar.spørsmålId,
        svarId: svar.svarId
    })}`)
}

const logPublishingOfAnswer = (answer) => {
    console.log(`📤 Published answer: ${JSON.stringify({
        category: answer.category,
        answer: answer.answer,
        teamName: answer.teamName,
        questionId: answer.questionId,
        answerId: answer.answerId
    })}`)
}