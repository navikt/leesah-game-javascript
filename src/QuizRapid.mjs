import { v4 as uuidv4 } from 'uuid'
import fs from "fs"
import YAML from 'yaml'
import { Kafka } from 'kafkajs'

/**
 * 
 * @param {string} lagnavn
 * @param {string[]} ignorerteKategorier
 */
export class QuizRapid {
    constructor(lagnavn, ignorerteKategorier) {
        return (async () => {
            console.log("🚀 Starter opp...")

            let kafka

            try {
                const leesahCertsSomJSON = YAML.parse(fs.readFileSync("./leesah-certs.yaml", "utf-8"))

                kafka = new Kafka({
                    clientId: `leesah-game-${lagnavn}`,
                    brokers: [`${leesahCertsSomJSON.broker}:26484`],
                    ssl: {
                        rejectUnauthorized: false,
                        ca: [leesahCertsSomJSON.ca],
                        key: leesahCertsSomJSON.user.access_key,
                        cert: leesahCertsSomJSON.user.access_cert,
                    }
                })

                this.topic = leesahCertsSomJSON?.topics[0];
            } catch (e) {
                console.error(`Error i hentingen og behandlingen av leesah sertifikat: ${e}`)
            }

            this.lagnavn = lagnavn
            this.ignorerteKategorier = ignorerteKategorier

            const consumer = kafka.consumer({ groupId: uuidv4() })
            await consumer.connect()
            await consumer.subscribe({ topic: this.topic, fromBeginning: true })
            this.consumer = consumer

            this.producer = await kafka.producer().connect()

            this.running = true

            console.log("🔍 Ser etter første spørsmål")

            return this
        })()

    }

    async #settOppConsumer(kafka) {
        const consumer = kafka.consumer({ groupId: uuidv4() })
        await consumer.connect()
        await consumer.subscribe({ topic: this.topic, fromBeginning: true })
        this.consumer = consumer
    }

    async #settOppProducer(kafka) {
        this.producer = await kafka.producer().connect()
    }



    // TODO: dette funker ikke siden 'eachMessage' aldri escaper
    // TODO: Må finne en metode for å kunne hente en og en melding, og behandle de i en stor smell
    async hentAlleSpørsmål() {
        const alleSpørsmål = []
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                try {
                    if (message.value) {
                        const spørsmål = this.#håndterMelding(message.value)

                        if (spørsmål) {
                            if (!this.ignorerteKategorier.includes(spørsmål.kategorinavn)) {
                                console.log(`📥 Mottok spørsmål:`)
                                console.log(spørsmål)
                            }
                            alleSpørsmål.push(spørsmål)
                        }
                    } else {
                        console.error("Kafka meldingen har ingen verdi!")
                    }
                } catch {
                    this.#håndterError(message)
                }
            },
        })

    }

    async publiserSvar(svar, spørsmål) {

    }

    async avslutt() {
        console.log("🛑 Stenger ned...")

        await this.producer.disconnect()
        await this.consumer.disconnect()

        self.running = false
    }

    #håndterMelding(melding) {
        const meldingSomJson = JSON.parse(melding.toString())

        return meldingSomJson['@event_name'] && meldingSomJson['@event_name'] === 'SPØRSMÅL' ? {
            kategorinavn: meldingSomJson['kategorinavn'],
            spørsmål: meldingSomJson['spørsmål'],
            svarformat: meldingSomJson['svarformat'],
            id: meldingSomJson['spørsmålId']
        } : undefined;
    }

    #håndterError(melding) { }
}