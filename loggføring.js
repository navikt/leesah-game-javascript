export const loggMottattSpørsmål = (spørsmål) => {
    console.log(`📥 Mottok spørsmål: ${JSON.stringify({
        kategori: spørsmål.kategori,
        spørsmål: spørsmål.spørsmål,
        svarformat: spørsmål.svarformat,
        dokumentasjon: spørsmål.dokumentasjon,
        spørsmålId: spørsmål.spørsmålId,
    })}`)
}

export const logRecievedQuestion = (question) => {
    console.log(`📥 Recieved question: ${JSON.stringify({
        category: kategoriPaaEngelsk(question.kategori),
        question: question.spørsmål,
        answerFormat: question.svarformat,
        documentation: question.documentation,
        questionId: question.spørsmålId
    })}`)
}

export const loggPubliseringAvSvar = (svar) => {
    console.log(`📤 Publisert svar: ${JSON.stringify({
        kategori: svar.kategori,
        svar: svar.svar,
        lagnavn: svar.lagnavn,
        spørsmålId: svar.spørsmålId,
        svarId: svar.svarId
    })}`)
}

export const logPublishingOfAnswer = (answer) => {
    console.log(`📤 Published answer: ${JSON.stringify({
        category: kategoriPaaEngelsk(answer.kategori),
        answer: answer.svar,
        teamName: answer.lagnavn,
        questionId: answer.questionId,
        answerId: answer.svarId
    })}`)
}

const kategoriPaaEngelsk = (kategori) => {
    switch (kategori) {
        case "lagregistrering":
            return "team-registration"
        case "ordsøk":
            return "word-search"
        case "aritmetikk":
            return "arithmetic"
        case "bankkonto":
            return "bank-account"
        case "primtall":
            return "prime-numbers"
        case "grunnbeløp":
            return "basic-amount"
        case "kalkulator":
            return "calculator"
        case "deduplisering":
            return "deduplication"
        default:
            return kategori
    }
}