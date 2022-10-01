export const titleIdGenerate = title => {
    return title
        .replaceAll('“', "")
        .replaceAll("”", "")
        .replaceAll("\"", "")
        .replaceAll(" ", "-")
        .replaceAll(",", "-")
        .replaceAll('Ə', "E")
        .replaceAll("ə", "e")
        .replaceAll("Ö", "o")
        .replaceAll("ö", "o")
        .replaceAll("Ü", "u")
        .replaceAll("ü", "u")
        .replaceAll("İ", "I")
        .replaceAll("i", "i")
        .replaceAll("Ğ", "G")
        .replaceAll("ğ", "g")
        .replaceAll("Ş", "S")
        .replaceAll("ş", "s")
        .replaceAll("Ç", "c")
        .replaceAll("ç", "c")
        .replaceAll("&", "-")
        .replaceAll("!", "-")
        .replaceAll("-", "-")
        .replaceAll("(", "-")
        .replaceAll(")", "-")
        .replaceAll("--", "-")
        .replaceAll("!!", "-")
        .toLowerCase() + "-" + Date.now().toString();
}