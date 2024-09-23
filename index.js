import { v4 as uuidv4 } from 'uuid'
import fs from "fs"
import YAML from 'yaml'
import { Kafka } from 'kafkajs'
import { format, } from 'date-fns'

let producer
let teamnavn
let topic

export const lastKafka = async (lagnavn) => {
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

        return { consumer };

    } catch (e) {
        console.error(`Feil i lastingen av kafka: ${e}`)
    }
}


// TODO, denne må vel kanskje hete noe smartere
export const spørsmålFraHendelse = (hendelse) => {
    return hendelse['@event_name'] === 'SPØRSMÅL' ? {
        type: hendelse['@event_name'],
        spørsmålId: hendelse.spørsmålId,
        spørsmål: hendelse.spørsmål,
        kategorinavn: hendelse.kategorinavn,
        svarformat: hendelse.svarformat,
        dokumentasjon: hendelse.dokumentasjon
    } : undefined
}

export const publiserSvar = async (spørsmål, svar) => {
    await producer.send({
        topic,
        messages: [{
            value: JSON.stringify({
                svar,
                '@event_name': 'SVAR',
                '@opprettet': `${format(new Date(), "yyyy-MM-dd")}T${format(new Date(), "HH:mm:ss")}`,
                spørsmålId: spørsmål.spørsmålId,
                kategorinavn: spørsmål.kategorinavn,
                lagnavn: teamnavn,
                svarId: uuidv4()
            })
        }]
    })
}