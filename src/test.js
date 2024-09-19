import { QuizRapid } from "./QuizRapid.mjs";



(async () => {
    const LAGNAVN = "pelton pasta"
    const HEXKODE = "#FFF999"
    const leesahRapid = await new QuizRapid(LAGNAVN, [])

    const håndterTeamRegistration = (svar, spørsmål) => {
        leesahRapid.publiserSvar(svar, spørsmål)
    }

    try {
        await leesahRapid.hentAlleSpørsmål().map((spørsmål) => {
            console.log('heihei')
            if (spørsmål.kategorinavn === 'team-registration') håndterTeamRegistration(HEXKODE, spørsmål)
        })
    } catch {
        //await leesahRapid.avslutt()
    }
})();

