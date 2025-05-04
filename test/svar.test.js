import { v4 as uuidv4 } from 'uuid'
import { spørsmålFraHendelse, questionFromEvent, lagSvarObjekt, createAnswerObject } from '../index';
import { spørsmålMock } from './mock/spørsmålMock';
import { svarMock } from './mock/svarMock';
const svarId = uuidv4()

const { kafkaHendelse } = spørsmålMock
const { svar } = svarMock(svarId)

const teamnavn = "l33t team"

test('lagSvarObjekt() parser og returnerer riktig objekt', () => {
    expect(lagSvarObjekt(spørsmålFraHendelse(kafkaHendelse.lagregistrering), "#f3f3f3", svarId, teamnavn)).toEqual(svar.lagregistering)
})

describe('createAnswerObject() parser og returnerer riktig objekt', () => {
    test('lagregistrering svares riktig', () => {
        expect(createAnswerObject(questionFromEvent(kafkaHendelse.lagregistrering), "#f3f3f3", svarId, teamnavn)).toEqual(svar.lagregistering)
    })
    test('aritmetikk svares riktig', () => {
        expect(createAnswerObject(questionFromEvent(kafkaHendelse.aritmetikk), "-13", svarId, teamnavn)).toEqual(svar.aritmetikk)
    })
    test('base64 svares riktig', () => {
        expect(createAnswerObject(questionFromEvent(kafkaHendelse.base64), "LEESAH", svarId, teamnavn)).toEqual(svar.base64)
    })
    test('grunnbeløp svares riktig', () => {
        expect(createAnswerObject(questionFromEvent(kafkaHendelse.grunnbeløp), "5400", svarId, teamnavn)).toEqual(svar.grunnbeløp)
    })
    test('min-max svares riktig', () => {
        expect(createAnswerObject(questionFromEvent(kafkaHendelse.minMax), "94", svarId, teamnavn)).toEqual(svar.minMax)
    })
    test('nav svares riktig', () => {
        expect(createAnswerObject(questionFromEvent(kafkaHendelse.nav), "sykepenger", svarId, teamnavn)).toEqual(svar.nav)
    })
    test('primtall svares riktig', () => {
        expect(createAnswerObject(questionFromEvent(kafkaHendelse.primtall), "true", svarId, teamnavn)).toEqual(svar.primtall)
    })
    test('deduplisering svares riktig', () => {
        expect(createAnswerObject(questionFromEvent(kafkaHendelse.deduplisering), "You shall not fool me!", svarId, teamnavn)).toEqual(svar.deduplisering.en)
    })
    test('bankkonto svares riktig', () => {
        expect(createAnswerObject(questionFromEvent(kafkaHendelse.bankkonto), "-6764", svarId, teamnavn)).toEqual(svar.bankkonto)
    })
})