# LEESAH JavaScript

> Leesah-game er et hendelsedrevet applikasjonsutviklingspill som utfordrer spillerne til å bygge en hendelsedrevet applikasjon. 
> Applikasjonen håndterer forskjellige typer oppgaver som den mottar som hendelser på en Kafka-basert hendelsestrøm. 
> Oppgavene varierer fra veldig enkle til mer komplekse.

JavaScript-bibliotek for å spille LEESAH!

## Kom i gang

Det finnes to versjoner av Leesah-game!
En hvor man lager en applikasjon som kjører på Nais, og en hvor man spiller lokalt direkte fra terminalen.
Dette biblioteket kan brukes i begge versjoner, men denne dokumentasjonen dekker **kun** lokal spilling.

### Sett opp lokalt miljø

For å kunne spille Leesah-game med JavaScript, anbefaler vi å ha Node versjon 22+ og NPM versjon 10+ installert.

Start med å opprette en katalog `leesah-game`.

**For macOS/Linux**
```
mkdir leesah-game
cd leesah-game
npm init -y
```

### Installer biblioteket

Det er kun en avhengighet du trenger, og det er biblioteket [leesah-game](https://www.npmjs.com/package/@navikt/leesah-game)

```shell
npm install @navikt/leesah-game
```

### Hent Kafkasertifikat

Sertifikater for å koble seg på Kafka ligger tilgjengelig på [leesah-certs.ekstern.dev.nav.no](https://leesah-certs.ekstern.dev.nav.no), passord får du utdelt.

På macOS/linux kan du også bruke kommandoen nedenfor:
```bash
wget --user leesah-game --password <password> -O leesah-certs.zip https://leesah-certs.ekstern.dev.nav.no && unzip leesah-certs.zip
```

Du vil nå ende opp med filen `leesah-certs.yaml` i `leesah-game`-katalogen du lagde tidligere.

### Eksempelkode
For å gjøre det enklere å komme i gang har vi et fungerende eksempel som svarer på spørsmålet om lagregistrering med et navn og en farge (hexkode).
Opprett filen `index.mjs` og lim inn koden nedenfor. OBS: husk at filtypen må være `*.mjs`!

```js
/**
 * 1. Hent ned sertifikater, og sikre deg at de ligger i filen leesah-certs.yaml
 * 2. Sett 'LAGNAVN' til ditt valgte lagnavn
 * 3. Sett 'HEXKODE' til din valgte farge
*/

import { lastKafka, publiserSvar, spørsmålFraHendelse } from "@navikt/leesah-game";

const ignorerteKategorier = [
    // "team-registration"
]

const LAGNAVN = "BYTT MEG";
const HEXKODE = "BYTT MEG";

async function kjør() {
    try {
        const { consumer } = await lastKafka(LAGNAVN, ignorerteKategorier)

        await consumer.run({
            eachMessage: async ({ message: hendelse }) => {
                const spørsmål = spørsmålFraHendelse(JSON.parse(hendelse.value?.toString()))
                if (spørsmål) {
                    // ### FRA HER SPILLES LEESAH! ###
                    if (spørsmål.kategorinavn === 'team-registration') {
                        await publiserSvar(spørsmål, HEXKODE)
                    } else if (spørsmål.kategorinavn === 'ping-pong') {
                        // Fortsett spillet nedover
                    }
                }
            }
        })
    } catch (e) {
        console.error(e)
    }
}

void kjør()
```

### Kjør koden

Kjør koden din med:
```shell
node index.mjs
```