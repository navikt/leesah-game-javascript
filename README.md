# Leesah JavaScript

Go [further down 🇬🇧☕️🍪🎩](#leesah-javascript-english) for the English documentation.

> Leesah-game er et hendelsedrevet applikasjonsutviklingspill som utfordrer spillerne til å bygge en hendelsedrevet applikasjon. 
> Applikasjonen håndterer forskjellige typer oppgaver som den mottar som hendelser på en Kafka-basert hendelsestrøm. 
> Oppgavene varierer fra veldig enkle til mer komplekse.

JavaScript-bibliotek for å spille Leesah!

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

Sertifikater for å koble seg på Kafka ligger tilgjengelig på [leesah.io/certs](https://leesah.io/certs), passord får du utdelt.

På macOS/linux kan du også bruke kommandoen nedenfor:
```bash
curl -u leesah-game:<se presentasjon> -o leesah-certs.zip https://leesah.io/certs && unzip leesah-certs.zip
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
    // "lagregistrering"
]

const LAGNAVN = "BYTT MEG";
const HEXKODE = "BYTT MEG";

async function kjør() {
    try {
        const { consumer } = await lastKafka(LAGNAVN, ignorerteKategorier)

        await consumer.run({
            eachMessage: async ({ message: hendelse }) => {
                const spørsmål = spørsmålFraHendelse(hendelse)
                if (spørsmål) {
                    // ### FRA HER SPILLES LEESAH! ###
                    if (spørsmål.kategori === 'lagregistrering') {
                        await publiserSvar(spørsmål, HEXKODE)
                    } else if (spørsmål.kategori === 'ping-pong') {
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

# Leesah JavaScript English

> Leesah-game is an event-driven application development game that challenges players to build an event-driven application.
> The application handles different types of tasks that it receives as events on a Kafka-based event stream.
> The tasks vary from very simple to more complex.

This is the JavaScript library to play Leesah!

## Getting started

There are two versions of the the Leesah game!
On is for local play, directly in the terminal.
While the other is running on the Nais platform, and you learn how to be a developer in Nav and use Nais.
This library is used by both versions, but the following documentation is **just** for local play.

### Setting up local environment

To be able to use JavaScript to play Leesah-game, we recommend that you have Node version 22+ and NPM version 10+ installed.

Start by creating a folder with name `leesah-game`.

**For macOS/Linux**
```
mkdir leesah-game
cd leesah-game
npm init -y
```

### Install the library

There is only one dependency you need to play, the library [leesah-game](https://www.npmjs.com/package/@navikt/leesah-game)

```shell
npm install @navikt/leesah-game
```

### Fetch Kafka certificates

You need some certificates to connect to the Kafka cluster, which is available at [leesah.io/certs](https://leesah.io/certs).
The username is always `leesah-game`, and the password will be distributed.

On macOS/Linux you can also use the one-liner below:
```bash
curl -u leesah-game:<se presentasjon> -o leesah-certs.zip https://leesah.io/certs && unzip leesah-certs.zip
```

You will now end up with `leesah-certs.yaml` in the `leesah-game` directory you made earlier.

### Example code
To make it easy to start we have made a working example that answer the first question, `team-registration`, with a dummy name and color.
All you need to do is update `TEAM_NAME` and `HEX_CODE`, and your ready to compete!

Create a file named `index.mjs` and paste the code below. OBS: the file has to be of type `*.mjs`!

```js
/**
 * 1. Download the Kafka certificate, and make sure that you have a file called leesah-certs.yaml in the same directory as this file
 * 2. Set your own 'TEAM_NAME'
 * 3. Set your own 'HEX_CODE' as team color
*/

import { loadKafka, publishAnswer, questionFromEvent } from "./index.js";

const ignoredCategories = [
    // "team-registration"
]

const TEAM_NAME = "CHANGE_ME";
const HEX_CODE = "CHANGE_ME";

async function run() {
    try {
        const { consumer } = await loadKafka(TEAM_NAME, ignoredCategories)

        await consumer.run({
            eachMessage: async ({ message: event }) => {
                const question = questionFromEvent(event)
                if (question) {
                    // ### FROM THIS POINT YOU PLAY LEESAH! ###
                    if (question.category === 'team-registration') {
                        await publishAnswer(question, HEX_CODE)
                    } else if (question.category === 'ping-pong') {
                        // Continue the game below
                    }
                }
            }
        })
    } catch (e) {
        console.error(e)
    }
}

void run()
```

### Run your code with

```shell
node index.mjs
```