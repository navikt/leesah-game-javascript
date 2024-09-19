import { v4 as uuidv4 } from 'uuid'
import fs from "fs"
import YAML from 'yaml'
import { Kafka } from 'kafkajs'

/**
 * 
 * @param {string} lagnavn
 * @param {string[]} ignorerteKategorier
 * @param {string} topic
 * @param {string} consumerGroupId
 */
export class QuizRapid {
    constructor(lagnavn, ignorerteKategorier, topic = process.env.QUIZ_TOPIC, consumerGroupId = uuidv4()) {
        return (async () => {
            console.log("🚀 Starter opp...")

            let kafka

            try {
                const leesahCertsSomJSON = YAML(fs.readFileSync("./leesah-certs.yaml"))

                kafka = new Kafka({
                    clientId: `leesah-game-${lagnavn}`,
                    brokers: [leesahCertsSomJSON?.broker],
                    ssl: {
                        rejectUnauthorized: false,
                        ca: [leesahCertsSomJSON.ca],
                        key: leesahCertsSomJSON.user.access_key,
                        cert: leesahCertsSomJSON.user.access_cert
                    }
                })

                this.topic = topic ? topic : leesahCertsSomJSON?.topics[0];
            } catch (e) {
                console.error(`Error i hentingen og behandlingen av leesah sertifikat: ${e}`)
            }

            this.lagnavn = lagnavn
            this.consumer = await kafka.consumer({ groupId: consumerGroupId }).connect().subscribe({ topic, fromBeginning: true })
            this.producer = await kafka.producer().connect()
            this.ignorerteKategorier = ignorerteKategorier

            this.running = true

            console.log("🔍 Ser etter første spørsmål")

            return this

        })()
    }

    // TODO: skal dette være en egen metode, kafkajs har jo allerede et "runtime" for å hente alle meldinger
    async hentSpørsmål() {
        while (this.running) {

        }
    }

    /**
     * 
     * @param {string} svar 
     */
    async publiserSvar(svar) {

    }

    async avslutt() {
        console.log("🛑 Stenger ned...")

        await this.producer.disconnect()
        await this.consumer.disconnect()

        self.running = false
    }

    #håndterMelding(melding) { }

    #håndterError(melding) { }
}