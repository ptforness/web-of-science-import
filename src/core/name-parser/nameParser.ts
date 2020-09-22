import { Name } from '../interfaces/name';
import Pattern from './pattern';

class NameParser {
  /**
   * Parses a string representation of a name, and returns a Name instance
   * @param {string} input String representation of the name to parse
   * @returns {Name} Name instance
   */
  public static parseName(input: string, ...fallbacks: string[]): Name {
    try {
      return NameParser._parse(input);
    } catch (error) {
      fallbacks.forEach((f) => {
        return NameParser._parse(f);
      });
      return { original: input, isParsed: false } as Name;
    }
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
   * @param {string} input String representation of the name to parse
   * @returns {Name} Name instance
   */
  private static _parse(input: string): Name {
    if (input == null || input == '') throw Error;

    const [out, rest]: [Name, string] = NameParser._extractTokens(input);
    Object.assign(out, NameParser._parseName(rest), { original: input, isParsed: true });
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
  private static _parseName(nameString: string): Name | null {
    if (nameString == null) return null; // Case: Entire name parsed by _extractTokens

    // Default
    const out: Name = { isParsed: false };

    // Account for double/triple spaces in split, and correct them after
    const tokens: string[] = nameString.split(/\s+/).map((token) => token.replace(/\s{2,}/, ' '));

    switch (tokens.length) {
      case 1:
        out.first = tokens[0];
        break;
      case 2:
        if (Pattern.hyphenated.test(tokens[0]) || Pattern.initial.test(tokens[1])) {
          out.first = tokens[0]; // J | J. | John | John-Deer
          out.middle = tokens[1]; // W | W. | Wilson (if first == John-Deer)
        } else if (Pattern.initial.test(tokens[0])) {
          out.first = `${tokens[0]} ${tokens[1]}`; // J Deer | J. Deer | John Deer
        } else {
          // NOTE: Needs Test cases
          out.first = tokens[0]; // John
          out.middle = tokens[1]; // Wilson
        }
        break;
      case 3:
        if (Pattern.initial.test(tokens[1]) && Pattern.initial.test(tokens[2])) {
          // Check for title
          out.first = tokens[0]; // J | J. | John
          out.title = `${tokens[1]}${tokens[2]}`; // MD | M.D | MD. | M.D.
        } else {
          out.first = tokens[0];
          out.middle = tokens[1];
          out.last = tokens[2];
        }
        break;
      default:
        //out.first = tokens[0];
        //break;
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
    const out: Name = { isParsed: false };
    const tokens: string[] = nameString.split(',');
    let rest: string;
    let restToken: number;

    switch (tokens.length) {
      case 3: // Default: Nick, Last, and Suffix
        restToken = 1;
        out.last = tokens[0].trim();
        out.suffix = tokens[2].trim();
        break;
      case 2:
        if (tokens[0].match(Pattern.doubleLastName)) {
          // Case: Double last names (either/both can be hyphenated)
          restToken = 1;
          out.last = tokens[0].trim();
        } else if (tokens[0].includes(' ')) {
          // Cases: (FI | FI.) (FI | FI. | First) ("Nick" | (Nick))?, Suffix
          restToken = 0;
          out.suffix = tokens[1].trim();
        } else {
          // Default: Nick and Last
          restToken = 1;
          out.last = tokens[0].trim();
        }
        break;
      case 1: // Default: Nick
        restToken = 0;
        rest = tokens[0].trim();
        break;
    }

    [out.nick, tokens[restToken]] = NameParser._extract(tokens[restToken], Pattern.nick);
    out.nick = NameParser._clean(out.nick);
    rest = tokens[restToken].trim();

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
      return [matches[0], input];
    }

    return [undefined, input];
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
