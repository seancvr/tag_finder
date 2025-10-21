/*
Chrome tag formats:
AW-xxxx, DC-xxxx, G-xxxx, GT-xxx, GTM-xxxx, PUB-xxxx and UA-xxx-x

Regex:
GTM-[A-Z0-9]+ matches GTM- followed by one or more (+) uppercase letters/digits.
G-[A-Z0-9]+ matches G- followed by one or more (+) uppercase letters/digits.
UA-[A-Z0-9-]+ matches UA- followed by on or more (+) uppercase letters, digits, or dashes.
(?=&|$) This is a lookahead assertions. Checks that what follows is either a & (start of another query parameter), 
or the end of the string ($), but does not include them in the match.
*/

export const idTagRegex = /id=(GTM-[A-Z0-9]+|G-[A-Z0-9]+|UA-[A-Z0-9-]+|AW-[0-9]+|DC-[0-9]+|GT-[A-Z0-9]+)(?=&|$)/

// extract the tag ID from the src url string
export function getTagId(url, regex) {
    if (regex.test(url)) {
        let extractedId = url.match(regex)
        return extractedId[1]
    } else {
      // if no match
        return null
    }
}