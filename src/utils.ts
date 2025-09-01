import { FORMAT_TOKEN_REGEX } from './constants'

/**
 * Parses a format string and extracts individual format tokens.
 *
 * The format string can contain various tokens, which are represented
 * by certain characters or character sequences. Tokens can be single
 * characters, multiple characters, or character sequences enclosed within
 * square brackets.
 *
 * @param {string} format - The format string to be parsed.
 * @returns {string[]} - An array of parsed tokens.
 *    Each element in the array represents a single token extracted from the format string.
 *
 * @example
 * const formatString = 'YYYY-MM-DD';
 * const parsedTokens = parseFormatTokens(formatString);
 * // Output: ['YYYY', '-', 'MM', '-', 'DD']
 *
 * @example
 * const formatString = "YYYY 'ello DD";
 * const parsedTokens = parseFormatTokens(formatString);
 * // Output: ['YYYY', " 'ello ", 'DD']
 */

export const parseFormatTokens = (format: string): string[] => {
    const tokens: RegExpMatchArray | null = format.match(FORMAT_TOKEN_REGEX)
    if (!tokens) return []

    return tokens.map(token => {
        return token.startsWith('[') && token.endsWith(']') ? token.slice(1, -1) : token
    })
}

/**
 * Converts a list of strings to a regex string.
 * It takes possible matching values to be from longest to shortest.  This
 * prevents the possibility of a match occurring for a value that also
 * a substring of a larger value that should have matched (e.g., 'abc'
 * matching when 'abcdef' should have been the match).
 *
 * @param toConvert - An array of string containing all the required regex values
 */
export const seqToRE = (toConvert: Array<string>): RegExp => {
    // returns /(?:)/ regex for empty array
    if (toConvert.length === 0) {
        return new RegExp('')
    }

    // deepcopy the passed array so as not to change it
    let toConvertCopy = [...toConvert]
    toConvertCopy = toConvertCopy.sort((a, b) => b.length - a.length)

    // means that the list only contains empty string(s)
    if (toConvertCopy[0] === '') {
        return new RegExp('') // returns /(?:)/
    }

    const regexString = `(${toConvertCopy.join('|')})`

    return new RegExp(regexString)
}
