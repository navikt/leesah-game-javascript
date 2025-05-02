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
})