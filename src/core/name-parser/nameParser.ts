import { Name } from '../interfaces/name';
import Pattern from './pattern';

class NameParser {

    /**
     * Parses a string representation of a name, and returns a Name instance
     * @param {string} input String representation of the name to parse
     * @returns {Name} Name instance
     */
    public static parseName(input: string): Name {
        return NameParser._parse(input);
    }

    /**
     * Parses an array containing string representations of names, returning a new array containing Name instances
     * @access public
     * @static
     * @method
     * @param {string[]} input Array of names to parse
     * @returns {Name[]} Array of Name instances
     */
    public static parseNames(input: string[]): Name[] {
        const out: Name[] = [];

        for (let i = 0; i < input.length; i++) {
            const name: Name = NameParser._parse(input[i]);
            out.push(name);
        }

        console.log(out);
        return out;
    }

    /**
     * Parses a string representation of a name, and returns a Name instance
     * @access private
     * @static
     * @method
     * @param {string} nameString String representation of the name to parse
     * @returns {Name} Name instance
     */
    private static _parse(nameString: string): Name {
        let out: Name;
        [out, nameString] = NameParser._extractTokens(nameString);
        Object.assign(out, NameParser._parseName(nameString));
        return out;
    }

    /**
     * Parses a name string for first name, middle name, and title tokens
     * @access private
     * @static
     * @method
     * @param nameString Input string to be parsed
     * @returns {Name} Name instance, possibly containing the following properties: first, middle, title 
     */
    private static _parseName(nameString: string): Name {
        if (nameString == null) return {}; // Case: Entire name parsed by _extractTokens

        // Default
        const out: Name = {};

        // Account for double/triple spaces in split, and correct them after
        const tokens: string[] = nameString.split(/\s+/).map(token => token.replace(/\s{2,}/, ' '));

        switch (tokens.length) {
            case 1:
                out.first = tokens[0];
                break;
            case 2:
                if (Pattern.hyphenated.test(tokens[0]) || Pattern.initial.test(tokens[1])) {
                    out.first = tokens[0]; // J | J. | John | John-Deer
                    out.middle = tokens[1]; // W | W. | Wilson (if first == John-Deer)
                }
                else {
                    out.first = `${tokens[0]} ${tokens[1]}`; // J Deer | J. Deer | John Deer
                }
                break;
            case 3:
                if (Pattern.initial.test(tokens[1]) && Pattern.initial.test(tokens[2])) { // Check for title
                    out.first = tokens[0] // J | J. | John
                    out.title = `${tokens[1]}${tokens[2]}`; // MD | M.D | MD. | M.D.
                } else {
                    out.first = tokens[0];
                    out.middle = tokens[1];
                    out.last = tokens[2];
                }
                break;
            default:
                throw new Error(`InvalidNameException: ${nameString}`);
        }
        return out;
    }

    /**
     * Extracts nickname, lastname, and suffix tokens, given an input string
     * @access private
     * @static
     * @method
     * @param nameString Input string to extract a nickname, lastname, and suffix from
     * @returns {[Name, string]} Array containing a Name instance,
     * followed by the unparsed portion of the input string
     */
    private static _extractTokens(nameString: string): [Name, string] {
        const out: Name = {};
        const tokens: string[] = nameString.split(',');
        let rest: string;

        switch (tokens.length) {
            case 3: // Default: Nick, Last, and Suffix
                out.last = tokens[0].trim();
                [out.nick, tokens[1]] = NameParser._extract(tokens[1], Pattern.nick);
                out.nick = NameParser._clean(out.nick);
                out.suffix = tokens[2].trim();
                rest = tokens[1].trim();
                break;
            case 2:
                if (tokens[0].match(Pattern.doubleLastName)) { // Case: Double last names (either/both can be hyphenated)
                    out.last = tokens[0].trim();
                    [out.nick, tokens[1]] = NameParser._extract(tokens[1], Pattern.nick);
                    out.nick = NameParser._clean(out.nick);
                    rest = tokens[1].trim();
                } else if (tokens[0].includes(' ')) { // Cases: (FI | FI.) (FI | FI. | First) ("Nick" | (Nick))?, Suffix
                    out.suffix = tokens[1].trim();
                    [out.nick, tokens[0]] = NameParser._extract(tokens[0], Pattern.nick);
                    out.nick = NameParser._clean(out.nick);
                    rest = tokens[0].trim();
                } else { // Default: Nick and Last
                    out.last = tokens[0].trim();
                    [out.nick, tokens[1]] = NameParser._extract(tokens[1], Pattern.nick);
                    out.nick = NameParser._clean(out.nick);
                    rest = tokens[1].trim();
                }
                break;
            case 1: // Default: Nick
                [out.nick, tokens[0]] = NameParser._extract(tokens[0], Pattern.nick);
                out.nick = NameParser._clean(out.nick);
                rest = tokens[0].trim();
                break;
        }

        return [out, rest];
    }

    /**
     * Extracts the first occurrance of a pattern from an input string
     * @access private
     * @static
     * @method
     * @param {string} input String to search
     * @param {RegExp} pattern Pattern to find in the input string
     * @returns {string[]} Array containing the match, followed by the input string with the match removed
     */
    private static _extract(input: string, pattern: RegExp): string[] {
        const matches: RegExpMatchArray = input.match(pattern);

        if (matches != null && matches.length != 0) {
            input = input.replace(matches[0], '');
            return [ matches[0], input ];
        }
        
        return [ undefined, input ];        
    }

    /**
     * Removes invalid characters from an input string
     * @param input String input to clean
     */
    private static _clean(input: string): string {
        if (input == null) return;
        const pattern: RegExp = Pattern.clean;
        return input.replace(pattern, '');
    }
}

export default NameParser;