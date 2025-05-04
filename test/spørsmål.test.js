import { spørsmålFraHendelse, questionFromEvent } from '../index';
import { spørsmålMock } from './mock/spørsmålMock';

const { kafkaHendelse, parsetHendelse } = spørsmålMock

test('spørsmålFraHendelse() parser og returnerer riktig objekt', () => {
    expect(spørsmålFraHendelse(kafkaHendelse.lagregistrering)).toEqual(parsetHendelse.nb.lagregistrering);
});

describe('questionFromEvent() parser og returnerer riktig objekt per kategori', () => {
    test('lagregistrering parses riktig', () => {
        expect(questionFromEvent(kafkaHendelse.lagregistrering)).toEqual(parsetHendelse.en.lagregistrering)
    })
    test('aritmetikk parses riktig', () => {
        expect(questionFromEvent(kafkaHendelse.aritmetikk)).toEqual(parsetHendelse.en.aritmetikk)
    })
    test('base64 parses riktig', () => {
        expect(questionFromEvent(kafkaHendelse.base64)).toEqual(parsetHendelse.en.base64)
    })
    test('grunnbeløp parses riktig', () => {
        expect(questionFromEvent(kafkaHendelse.grunnbeløp)).toEqual(parsetHendelse.en.grunnbeløp)
    })
    test('min-max parses riktig', () => {
        expect(questionFromEvent(kafkaHendelse.minMax)).toEqual(parsetHendelse.en.minMax)
    })
    test('nav parses riktig', () => {
        expect(questionFromEvent(kafkaHendelse.nav)).toEqual(parsetHendelse.en.nav)
    })
    test('ping-pong parses riktig', () => {
        expect(questionFromEvent(kafkaHendelse.pingPong)).toEqual(parsetHendelse.en.pingPong)
    })
    test('primtall parses riktig', () => {
        expect(questionFromEvent(kafkaHendelse.primtall)).toEqual(parsetHendelse.en.primtall)
    })
    test('deduplisering parses riktig', () => {
        expect(questionFromEvent(kafkaHendelse.deduplisering)).toEqual(parsetHendelse.en.deduplisering)
    })
    test('bankkonto parses riktig', () => {
        expect(questionFromEvent(kafkaHendelse.bankkonto)).toEqual(parsetHendelse.en.bankkonto)
    })
})