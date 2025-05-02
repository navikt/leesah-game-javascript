import { v4 as uuidv4 } from 'uuid'
import { spørsmålFraHendelse, questionFromEvent, lagSvarObjekt, createAnswerObject } from '../index';
import { spørsmålMock } from './mock/spørsmålMock';
import { svarMock } from './mock/svarMock';
const svarId = uuidv4()

const { kafkaHendelse } = spørsmålMock
const { svar } = svarMock(svarId)

test('lagSvarObjekt() parser og returnerer riktig objekt', () => {

    expect(lagSvarObjekt(spørsmålFraHendelse(kafkaHendelse.lagregistrering), "#f3f3f3", svarId, "l33t team")).toEqual(svar.nb.lagregistering)
})

describe('createAnswerObject() parser og returnerer riktig objekt', () => {
    expect(createAnswerObject(questionFromEvent(kafkaHendelse.lagregistrering), "#f3f3f3", svarId, "l33t team")).toEqual(svar.nb.lagregistering)
})