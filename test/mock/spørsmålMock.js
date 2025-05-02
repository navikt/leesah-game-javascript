export const spørsmålMock = {
    kafkaHendelse: {
        lagregistrering: {
            value: JSON.stringify({ "@event_name": "SPØRSMÅL", "type": "SPØRSMÅL", "spørsmålId": "f1ac4414-e3ec-4402-944c-e48ebc83eee8", "spørsmål": "Velg en hex-kode med 6 tegn for å representere ditt team. Eksempel: #FFFFFF", "kategori": "lagregistrering", "svarformat": "Hex kode i string", "dokumentasjon": "https://leesah.io/oppgaver/lagregistrering", "@id": "19e94461-5a51-4285-8ffc-1b6fe064e52f", "@opprettet": "2025-05-02T08:28:56.642900847", "system_read_count": 0, "system_participating_services": [{ "id": "19e94461-5a51-4285-8ffc-1b6fe064e52f", "time": "2025-05-02T08:28:56.642900847", "service": "leesah-quizmaster-backend", "instance": "leesah-quizmaster-backend-7946d9964c-tz26j", "image": "europe-north1-docker.pkg.dev/nais-management-233d/leesah-quiz/leesah-quizmaster:2025.04.15-12.24-d95e24e" }] })
        }
    },
    parsetHendelse: {
        nb: {
            lagregistrering: {
                "type": "SPØRSMÅL",
                "kategori": "lagregistrering",
                "spørsmål": "Velg en hex-kode med 6 tegn for å representere ditt team. Eksempel: #FFFFFF",
                "svarformat": "Hex kode i string",
                "dokumentasjon": "https://leesah.io/oppgaver/lagregistrering",
                "spørsmålId": "f1ac4414-e3ec-4402-944c-e48ebc83eee8"
            }
        },
        en: {
            lagregistrering: {
                "type": "QUESTION",
                "questionId": "f1ac4414-e3ec-4402-944c-e48ebc83eee8",
                "category": "team-registration",
                "question": "Choose a hex code of at least 6 characters to represent your team. Example: #FFFFFF",
                "answerFormat": "Hex code as string",
                "documentation": "https://leesah.io/en/tasks/team-registration"
            }
        }
    }
}