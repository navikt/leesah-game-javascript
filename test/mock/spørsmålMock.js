// TODO: Husk å prøve spørsmålene/svar som vi har i docsa

export const spørsmålMock = {
    kafkaHendelse: {
        lagregistrering: {
            value: JSON.stringify({ "@event_name": "SPØRSMÅL", "type": "SPØRSMÅL", "spørsmålId": "f1ac4414-e3ec-4402-944c-e48ebc83eee8", "spørsmål": "Velg en hex-kode med 6 tegn for å representere ditt team. Eksempel: #FFFFFF", "kategori": "lagregistrering", "svarformat": "Hex kode i string", "dokumentasjon": "https://leesah.io/oppgaver/lagregistrering", "@id": "19e94461-5a51-4285-8ffc-1b6fe064e52f", "@opprettet": "2025-05-02T08:28:56.642900847", "system_read_count": 0, "system_participating_services": [{ "id": "19e94461-5a51-4285-8ffc-1b6fe064e52f", "time": "2025-05-02T08:28:56.642900847", "service": "leesah-quizmaster-backend", "instance": "leesah-quizmaster-backend-7946d9964c-tz26j", "image": "europe-north1-docker.pkg.dev/nais-management-233d/leesah-quiz/leesah-quizmaster:2025.04.15-12.24-d95e24e" }] })
        },
        aritmetikk: {
            value: JSON.stringify({ "@event_name": "SPØRSMÅL", "type": "SPØRSMÅL", "spørsmålId": "d6bf9318-9ce2-4393-a526-2761a982d967", "spørsmål": "49 - 62", "kategori": "aritmetikk", "svarformat": "Svaret må rundes til int, men sender som en string", "dokumentasjon": "https://leesah.io/oppgaver/aritmetikk", "@id": "b5d61da7-800a-41eb-99ac-1d257dd89e98", "@opprettet": "2025-05-02T14:34:44.489770273", "system_read_count": 0, "system_participating_services": [{ "id": "b5d61da7-800a-41eb-99ac-1d257dd89e98", "time": "2025-05-02T14:34:44.489770273", "service": "leesah-quizmaster-backend", "instance": "leesah-quizmaster-backend-7946d9964c-tz26j", "image": "europe-north1-docker.pkg.dev/nais-management-233d/leesah-quiz/leesah-quizmaster:2025.04.15-12.24-d95e24e" }] })
        },
        base64: {
            value: JSON.stringify({ "@event_name": "SPØRSMÅL", "type": "SPØRSMÅL", "spørsmålId": "a8976013-d6d9-4e27-a931-25a209fc5ec8", "spørsmål": "TEVFU0FI", "kategori": "base64", "svarformat": "Dekryptert string", "dokumentasjon": "https://leesah.io/oppgaver/base64", "@id": "2696fed7-5ae8-4628-b21f-da3719b4f17f", "@opprettet": "2025-05-02T14:38:43.509121852", "system_read_count": 0, "system_participating_services": [{ "id": "2696fed7-5ae8-4628-b21f-da3719b4f17f", "time": "2025-05-02T14:38:43.509121852", "service": "leesah-quizmaster-backend", "instance": "leesah-quizmaster-backend-7946d9964c-tz26j", "image": "europe-north1-docker.pkg.dev/nais-management-233d/leesah-quiz/leesah-quizmaster:2025.04.15-12.24-d95e24e" }] })
        },
        grunnbeløp: {
            value: JSON.stringify({ "@event_name": "SPØRSMÅL", "type": "SPØRSMÅL", "spørsmålId": "b2fa21ec-bc8e-4a4a-895e-e520ea2730ec", "spørsmål": "Grunnbeløp for dato 1967-07-14", "kategori": "grunnbeløp", "svarformat": "Tall i String", "dokumentasjon": "https://leesah.io/oppgaver/grunnbeløp", "@id": "46f064bc-9566-40c1-909a-0619361dcdb6", "@opprettet": "2025-05-02T14:42:34.659157175", "system_read_count": 0, "system_participating_services": [{ "id": "46f064bc-9566-40c1-909a-0619361dcdb6", "time": "2025-05-02T14:42:34.659157175", "service": "leesah-quizmaster-backend", "instance": "leesah-quizmaster-backend-7946d9964c-tz26j", "image": "europe-north1-docker.pkg.dev/nais-management-233d/leesah-quiz/leesah-quizmaster:2025.04.15-12.24-d95e24e" }] })
        },
        minMax: {
            value: JSON.stringify({ "@event_name": "SPØRSMÅL", "type": "SPØRSMÅL", "spørsmålId": "ba2e8705-7667-496d-8250-20fb3f400592", "spørsmål": "HØYESTE tall i [25, 66, 12, 3, 53, 54, 94, 67, 23, 55, 41, 30, 40, 50, 60, 70, 80, 10, 11, 1]", "kategori": "min-max", "svarformat": "String", "dokumentasjon": "https://leesah.io/oppgaver/min-max", "@id": "ae4b735f-58bd-4cb3-89e9-45f7a43fb763", "@opprettet": "2025-05-02T14:56:26.861530995", "system_read_count": 0, "system_participating_services": [{ "id": "ae4b735f-58bd-4cb3-89e9-45f7a43fb763", "time": "2025-05-02T14:56:26.861530995", "service": "leesah-quizmaster-backend", "instance": "leesah-quizmaster-backend-7946d9964c-tz26j", "image": "europe-north1-docker.pkg.dev/nais-management-233d/leesah-quiz/leesah-quizmaster:2025.04.15-12.24-d95e24e" }] })
        },
        nav: {
            value: JSON.stringify({ "@event_name": "SPØRSMÅL", "type": "SPØRSMÅL", "spørsmålId": "535298f8-d305-4325-8851-a9281776e6b6", "spørsmål": "Hvilken ytelse fra Nav har syke arbeidere i Norge som oftest rett på?", "kategori": "nav", "svarformat": "String", "dokumentasjon": "https://leesah.io/oppgaver/nav", "@id": "a74a2fc7-8772-4f0c-9297-0f7e1a8af98c", "@opprettet": "2025-05-02T15:01:50.637749971", "system_read_count": 0, "system_participating_services": [{ "id": "a74a2fc7-8772-4f0c-9297-0f7e1a8af98c", "time": "2025-05-02T15:01:50.637749971", "service": "leesah-quizmaster-backend", "instance": "leesah-quizmaster-backend-7946d9964c-tz26j", "image": "europe-north1-docker.pkg.dev/nais-management-233d/leesah-quiz/leesah-quizmaster:2025.04.15-12.24-d95e24e" }] })
        },
        pingPong: {
            value: JSON.stringify({ "@event_name": "SPØRSMÅL", "type": "SPØRSMÅL", "spørsmålId": "bc834c65-01d0-4aaf-8d13-443cc0561504", "spørsmål": "ping", "kategori": "ping-pong", "svarformat": "String", "dokumentasjon": "https://leesah.io/oppgaver/ping-pong", "@id": "a7eb1b71-45b5-4c94-b87c-d2d9e5f49d3c", "@opprettet": "2025-05-02T14:30:38.527461473", "system_read_count": 0, "system_participating_services": [{ "id": "a7eb1b71-45b5-4c94-b87c-d2d9e5f49d3c", "time": "2025-05-02T14:30:38.527461473", "service": "leesah-quizmaster-backend", "instance": "leesah-quizmaster-backend-7946d9964c-tz26j", "image": "europe-north1-docker.pkg.dev/nais-management-233d/leesah-quiz/leesah-quizmaster:2025.04.15-12.24-d95e24e" }] })
        },
        primtall: {
            value: JSON.stringify({ "@event_name": "SPØRSMÅL", "type": "SPØRSMÅL", "spørsmålId": "8f0df84d-e762-4c02-81ee-73185bde3cf7", "spørsmål": "7", "kategori": "primtall", "svarformat": "true eller false som String", "dokumentasjon": "https://leesah.io/oppgaver/primtall", "@id": "2e305523-3906-4840-8ae1-a011feca6d5d", "@opprettet": "2025-05-02T15:03:51.12040021", "system_read_count": 0, "system_participating_services": [{ "id": "2e305523-3906-4840-8ae1-a011feca6d5d", "time": "2025-05-02T15:03:51.120400210", "service": "leesah-quizmaster-backend", "instance": "leesah-quizmaster-backend-7946d9964c-tz26j", "image": "europe-north1-docker.pkg.dev/nais-management-233d/leesah-quiz/leesah-quizmaster:2025.04.15-12.24-d95e24e" }] })
        },
        deduplisering: {
            value: JSON.stringify({ "@event_name": "SPØRSMÅL", "type": "SPØRSMÅL", "spørsmålId": "2b88ead2-2494-4196-a94e-200b8f0d80ea", "spørsmål": "Svar på kun ett spørsmål i denne kategorien med en <Du lurer ikke meg!>.", "kategori": "deduplisering", "svarformat": "String", "dokumentasjon": "https://leesah.io/oppgaver/deduplisering", "@id": "73282000-49be-4895-894a-7d9188d58275", "@opprettet": "2025-05-02T15:06:10.173285792", "system_read_count": 0, "system_participating_services": [{ "id": "73282000-49be-4895-894a-7d9188d58275", "time": "2025-05-02T15:06:10.173285792", "service": "leesah-quizmaster-backend", "instance": "leesah-quizmaster-backend-7946d9964c-tz26j", "image": "europe-north1-docker.pkg.dev/nais-management-233d/leesah-quiz/leesah-quizmaster:2025.04.15-12.24-d95e24e" }] })
        },
        bankkonto: {
            value: JSON.stringify({ "@event_name": "SPØRSMÅL", "type": "SPØRSMÅL", "spørsmålId": "64fd8a81-cab2-421d-a2e9-9874c4a375e7", "spørsmål": "UTTREKK: 6764", "kategori": "bankkonto", "svarformat": "Tall i String", "dokumentasjon": "https://leesah.io/oppgaver/bankkonto", "@id": "0d198286-7bf9-4a07-a03e-b31165053b64", "@opprettet": "2025-05-02T15:07:45.736885308", "system_read_count": 0, "system_participating_services": [{ "id": "0d198286-7bf9-4a07-a03e-b31165053b64", "time": "2025-05-02T15:07:45.736885308", "service": "leesah-quizmaster-backend", "instance": "leesah-quizmaster-backend-7946d9964c-tz26j", "image": "europe-north1-docker.pkg.dev/nais-management-233d/leesah-quiz/leesah-quizmaster:2025.04.15-12.24-d95e24e" }] })
        },
        ordsøk: {
            value: JSON.stringify({ "@event_name": "SPØRSMÅL", "type": "SPØRSMÅL", "spørsmålId": "1dc50e5e-7c7e-43f1-8455-552a94dc9adb", "spørsmål": "Finn ord relatert til Nav:\nnsl\noaw\nvlv", "kategori": "ordsøk", "svarformat": "Kommaseparert liste med ord (ord1, ord2, ...)", "dokumentasjon": "https://leesah.io/oppgaver/ordsøk", "@id": "23867433-d4c3-4d8b-b2ca-e03c9712bc2e", "@opprettet": "2025-05-02T15:09:20.970808991", "system_read_count": 0, "system_participating_services": [{ "id": "23867433-d4c3-4d8b-b2ca-e03c9712bc2e", "time": "2025-05-02T15:09:20.970808991", "service": "leesah-quizmaster-backend", "instance": "leesah-quizmaster-backend-7946d9964c-tz26j", "image": "europe-north1-docker.pkg.dev/nais-management-233d/leesah-quiz/leesah-quizmaster:2025.04.15-12.24-d95e24e" }] })
        },
        kalkulator: {
            value: JSON.stringify({ "@event_name": "SPØRSMÅL", "type": "SPØRSMÅL", "spørsmålId": "506eadbf-bc07-4480-ae56-e3a48003a222", "spørsmål": "På https://www.nav.no/aap/kalkulator kan du beregne omtrent hvor mye du får i AAP. Du er 69 år og ble syk i 2014. Du har ingen inntekt, har ikke AAP, eller en jobb. Barn har du heller ikke. Hva kan du omtrent få i året?", "kategori": "kalkulator", "svarformat": "Int som string", "dokumentasjon": "https://leesah.io/oppgaver/kalkulator", "@id": "340a1ac9-7973-4aae-bd78-077d4d4fd171", "@opprettet": "2025-05-02T15:10:40.933654684", "system_read_count": 0, "system_participating_services": [{ "id": "340a1ac9-7973-4aae-bd78-077d4d4fd171", "time": "2025-05-02T15:10:40.933654684", "service": "leesah-quizmaster-backend", "instance": "leesah-quizmaster-backend-7946d9964c-tz26j", "image": "europe-north1-docker.pkg.dev/nais-management-233d/leesah-quiz/leesah-quizmaster:2025.04.15-12.24-d95e24e" }] })
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