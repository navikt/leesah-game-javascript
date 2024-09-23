import { lastKafka, publiserSvar, spørsmålFraHendelse } from "./kafka.mjs";

const LAGNAVN = "Pelton bolognese";
const HEXKODE = "#FFF999";

async function kjør() {
    try {
        const { consumer } = await lastKafka(LAGNAVN)

        await consumer.run({
            eachMessage: async ({ message: hendelse }) => {
                if (hendelse.value) {
                    const spørsmål = spørsmålFraHendelse(JSON.parse(hendelse.value?.toString()))
                    if (spørsmål) {
                        if (spørsmål.kategorinavn === 'team-registration') {
                            await publiserSvar(spørsmål, HEXKODE)
                        } else if (spørsmål.kategorinavn === '*** kategorinavn ***') {
                            // TODO håndter svar
                        }
                    }
                } else {
                    console.error('Hendelse har ingen verdi')
                }
            }
        })
    } catch (e) {
        console.error(e)
    }
}

void kjør()