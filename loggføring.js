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
        category: question.category,
        question: question.question,
        answerFormat: question.answerFormat,
        documentation: question.documentation,
        questionId: question.questionId
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
        category: answer.category,
        answer: answer.answer,
        teamName: answer.teamName,
        questionId: answer.questionId,
        answerId: answer.answerId
    })}`)
}

