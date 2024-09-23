import { v4 as uuidv4 } from 'uuid'
import fs from "fs"
import YAML from 'yaml'
import { Kafka } from 'kafkajs'
import { format, } from 'date-fns'

let producer
let teamnavn
let topic

let ignorerteKatoerierListe = []

export const lastKafka = async (lagnavn, ignorerteKategorier) => {
    console.log("🚀 Starter opp...")

    try {
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

        topic = leesahCertsSomJSON?.topics[1];

        const consumer = kafka.consumer({ groupId: uuidv4() })
        await consumer.connect()
        await consumer.subscribe({ topic, fromBeginning: true })

        producer = kafka.producer();
        await producer.connect();

        teamnavn = lagnavn
        ignorerteKatoerierListe = [...ignorerteKategorier]

        return { consumer };
    } catch (e) {
        console.error(`Feil i lastingen av kafka: ${e}`)
    }
}

export const spørsmålFraHendelse = (hendelse) => {
    if (hendelse['@event_name'] === 'SPØRSMÅL') {
        const spm = {
            type: hendelse['@event_name'],
            kategorinavn: hendelse.kategorinavn,
            spørsmål: hendelse.spørsmål,
            svarformat: hendelse.svarformat,
            dokumentasjon: hendelse.dokumentasjon,
            spørsmålId: hendelse.spørsmålId,
        }

        if (!ignorerteKatoerierListe.includes(hendelse.kategorinavn)) console.log(`📥 Mottok spørsmål: ${JSON.stringify(spm)}`)

        return spm
    } else {
        return undefined
    }
}

export const publiserSvar = async (spørsmål, svar) => {
    const svr = {
        kategorinavn: spørsmål.kategorinavn,
        svar,
        lagnavn: teamnavn,
        spørsmålId: spørsmål.spørsmålId,
        svarId: uuidv4(),
        '@event_name': 'SVAR',
        '@opprettet': `${format(new Date(), "yyyy-MM-dd")}T${format(new Date(), "HH:mm:ss")}`,
    }

    await producer.send({
        topic,
        messages: [{
            value: JSON.stringify(svr)
        }]
    })

    if (!ignorerteKatoerierListe.includes(spørsmål.kategorinavn)) console.log(`📤 Publisert svar: ${JSON.stringify(svr)}`)

}