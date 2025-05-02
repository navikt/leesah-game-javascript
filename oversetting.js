export const hendelseTypePåEngelsk = (type) => {
    switch (type) {
        case "SPØRSMÅL":
            return "QUESTION"
        case "SVAR":
            return "ANSWER"
        default:
            return ""
    }
}

export const kategoriPåEngelsk = (kategori) => {
    switch (kategori) {
        case "lagregistrering":
            return "team-registration"
        case "aritmetikk":
            return "arithmetic"
        case "base64":
            return "base64"
        case "grunnbeløp":
            return "basic-amount"
        case "kalkulator":
            return "calculator"
        case "min-max":
            return "min-max"
        case "nav":
            return "nav"
        case "ordsøk":
            return "word-search"
        case "deduplisering":
            return "deduplication"
        case "bankkonto":
            return "bank-account"
        case "primtall":
            return "prime-numbers"
        case "ping-pong":
            return "ping-pong"
        default:
            return kategori
    }
}

export const kategoriFraEngelskTilNorsk = (category) => {
    switch (category) {
        case "team-registration":
            return "lagregistrering"
        case "arithmetic":
            return "aritmetikk"
        case "base64":
            return "base64"
        case "basic-amount":
            return "grunnbeløp"
        case "calculator":
            return "kalkulator"
        case "min-max":
            return "min-max"
        case "nav":
            return "nav"
        case "word-search":
            return "ordsøk"
        case "deduplication":
            return "deduplisering"
        case "bank-account":
            return "bankkonto"
        case "prime-numbers":
            return "primtall"
        case "ping-pong":
            return "ping-pong"
        default:
            return category
    }
}

export const spørsmålPåEngelsk = (spørsmål) => {
    switch (spørsmål.kategori) {
        case "lagregistrering":
            return "Choose a hex code of at least 6 characters to represent your team. Example: #FFFFFF"
        case "aritmetikk":
            return spørsmål.spørsmål
        case "base64":
            return spørsmål.spørsmål
        case "grunnbeløp":
            return grunnbeløpSpørsmålPåEngelsk(spørsmål.spørsmål)
        case "min-max":
            return minMaxSpørsmålPåEngelsk(spørsmål.spørsmål)
        case "nav":
            return navSpørsmålPåEngelsk(spørsmål.spørsmål)
        case "ping-pong":
            return spørsmål.spørsmål
        case "primtall":
            return spørsmål.spørsmål
        case "deduplisering":
            return "Answer only one question in this category with <You shall not fool me!>"
        case "bankkonto":
            return bankkontoSpørsmålPåEngelsk(spørsmål.spørsmål)
        case "ordsøk":
            return ""
        case "kalkulator":
            return ""
        default:
            return spørsmål.spørsmål
    }
}

export const svarformatPåEngelsk = (kategori) => {
    switch (kategori) {
        case "lagregistrering":
            return "Hex code as string"
        case "aritmetikk":
            return "Answer must be rounded to a integer, but sent as an string"
        case "base64":
            return "Decrypted string"
        case "grunnbeløp":
            return "Number as string"
        case "min-max":
            return "Number as string"
        case "nav":
            return "String"
        case "ping-pong":
            return "String"
        case "primtall":
            return "true or false as string"
        case "deduplisering":
            return "String"
        case "bankkonto":
            return "Number as string"
        case "ordsøk":
            return ""
        case "kalkulator":
            return ""
        default:
            return "N/A"
    }
}

// --- Hjelpemetoder for å oversette spørsmål til engelsk ---
const bankkontoSpørsmålPåEngelsk = (bankkontoSpørsmål) => {
    const splittetString = bankkontoSpørsmål.split(':')
    if (splittetString[0].includes("UTTREKK")) return `WITHDRAWAL:${splittetString[1]}`
    else if (splittetString[0].includes("INNSKUDD")) return `DEPOSIT:${splittetString[1]}`
    else return ""
}

const grunnbeløpSpørsmålPåEngelsk = (grunnebløpSpørsmål) => {
    const splittetString = grunnebløpSpørsmål.split(" ")
    return `Basic amount for date ${splittetString[4]}`
}

const minMaxSpørsmålPåEngelsk = (minMaxSpørsmål) => {
    const splittetString = grunnebløpSpørsmål.split("[")
    if (splittetString[0].includes("HØYESTE")) return `HIGHEST number in [${splittetString[1]}`
    if (splittetString[0].includes("LAVESTE")) return `LOWEST number in [${splittetString[1]}`
}

const navSpørsmålPåEngelsk = (navSpørsmål) => {
    if (navSpørsmål.includes("rekruttering")) return "At which website can you find information about recruting in Nav IT?"
    else if (navSpørsmål.includes("applikasjonsplattformen")) return "What is the name of Nav's application platform?"
    else if (navSpørsmål.includes("direktøren")) return "What is the name of Nav's director?"
    else if (navSpørsmål.includes("direktoratet sitt hovedkontor")) return "Where is the offices of the Nav directoate located?"
    else if (navSpørsmål.includes("designsystemet")) return "What is the name of Nav's design system?"
    else if (navSpørsmål.includes("1G")) return "As of 1. may 2024, how much is 1G?"
    else return ""
}