import { v4 as uuidv4 } from 'uuid'
import { spørsmålFraHendelse, questionFromEvent, lagSvarObjekt, createAnswerObject } from './index';

const lagregistreringSpørsmålKafkaHendelse = {
    "value": JSON.stringify({ "@event_name": "SPØRSMÅL", "type": "SPØRSMÅL", "spørsmålId": "f1ac4414-e3ec-4402-944c-e48ebc83eee8", "spørsmål": "Velg en hex-kode med 6 tegn for å representere ditt team. Eksempel: #FFFFFF", "kategori": "lagregistrering", "svarformat": "Hex kode i string", "dokumentasjon": "https://leesah.io/oppgaver/lagregistrering", "@id": "19e94461-5a51-4285-8ffc-1b6fe064e52f", "@opprettet": "2025-05-02T08:28:56.642900847", "system_read_count": 0, "system_participating_services": [{ "id": "19e94461-5a51-4285-8ffc-1b6fe064e52f", "time": "2025-05-02T08:28:56.642900847", "service": "leesah-quizmaster-backend", "instance": "leesah-quizmaster-backend-7946d9964c-tz26j", "image": "europe-north1-docker.pkg.dev/nais-management-233d/leesah-quiz/leesah-quizmaster:2025.04.15-12.24-d95e24e" }] })
}

const lagregistreringSpørsmålKafkaHendelseParsetPåNorsk = {
    "type": "SPØRSMÅL",
    "kategori": "lagregistrering",
    "spørsmål": "Velg en hex-kode med 6 tegn for å representere ditt team. Eksempel: #FFFFFF",
    "svarformat": "Hex kode i string",
    "dokumentasjon": "https://leesah.io/oppgaver/lagregistrering",
    "spørsmålId": "f1ac4414-e3ec-4402-944c-e48ebc83eee8"
}

const spørsmålKafkaHendelseParsetPåEngelskBase = {
    "type": "QUESTION",
    "questionId": "f1ac4414-e3ec-4402-944c-e48ebc83eee8",
}

const lagregistreringSpørsmålKafkaHendelseParsetPåEngelsk = {
    ...spørsmålKafkaHendelseParsetPåEngelskBase,
    "category": "team-registration",
    "question": "Choose a hex code of at least 6 characters to represent your team. Example: #FFFFFF",
    "answerFormat": "Hex code as string",
    "documentation": "https://leesah.io/en/tasks/team-registration"
}


// TODO: teste at alle spørsmål hendelser som mottas oversettes riktig. Teste disse per kategori
// TODO: teste at alle svar blir oversatt riktig.

test('spørsmålFraHendelse() parser og returnerer riktig objekt', () => {
    expect(spørsmålFraHendelse({ ...lagregistreringSpørsmålKafkaHendelse })).toEqual(lagregistreringSpørsmålKafkaHendelseParsetPåNorsk);
});

describe('questionFromEvent() parser og returnerer riktig objekt per kategori', () => {
    test('lagregistrering oversettes riktig', () => {
        expect(questionFromEvent({ ...lagregistreringSpørsmålKafkaHendelse })).toEqual(lagregistreringSpørsmålKafkaHendelseParsetPåEngelsk)
    })
})

const lagregistreringSvarObjekt = (svarId) => ({
    type: 'SVAR',
    kategori: 'lagregistrering',
    svar: "#f3f3f3",
    lagnavn: "l33t team",
    spørsmålId: "f1ac4414-e3ec-4402-944c-e48ebc83eee8",
    svarId
})

test('lagSvarObjekt() parser og returnerer riktig objekt', () => {
    const svarId = uuidv4()

    expect(lagSvarObjekt(spørsmålFraHendelse({ ...lagregistreringSpørsmålKafkaHendelse }), "#f3f3f3", svarId, "l33t team")).toEqual(lagregistreringSvarObjekt(svarId))
})

describe('createAnswerObject() parser og returnerer riktig objekt', () => {
    const answerId = uuidv4()

    expect(createAnswerObject(questionFromEvent({ ...lagregistreringSpørsmålKafkaHendelse }), "#f3f3f3", answerId, "l33t team")).toEqual(lagregistreringSvarObjekt(answerId))
})