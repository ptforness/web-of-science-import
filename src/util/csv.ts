import * as fs from 'fs';
const fsp = fs.promises;

export type Encoding =
  | 'ascii'
  | 'utf8'
  | 'utf-8'
  | 'utf16le'
  | 'ucs2'
  | 'ucs-2'
  | 'base64'
  | 'latin1'
  | 'binary'
  | 'hex';
export interface Options {
  encoding: Encoding;
  delimiter: string;
  log: boolean;
}

const defaultOptions: Options = {
  encoding: 'utf8',
  delimiter: '\t',
  log: false,
};

/**
 * Reads a csv file asynchronously, returning an array of objects
 * @param filepath Path to csv/tsv file to be read
 * @param options @type {Csv.Options} Options to read the csv/tsv file with
 * @returns {Promise<Array<any>>} A promise containing an array of objects
 */
export async function read(filepath: string, options: Options = defaultOptions): Promise<any[]> {
  const data: string = await fsp.readFile(filepath, options.encoding);
  const rows: string[] = data.split('\r\n');
  const keys: string[] = rows[0].split(options.delimiter);
  if (options.log) {
    console.log('Keys:');
    console.log(keys);
  }
  const json: any[] = [];
  for (let i = 1; i < rows.length; i++) {
    if (rows[i] === '') continue; // Case: Empty record, typically before end of file
    const values: any[] = rows[i].split(options.delimiter);
    json[i - 1] = values
      .map((value, index) => ({ [keys[index]]: value })) // Create an object for each  k/v pair in the record...
      .reduce((current, previous) => ({ ...current, ...previous })); // ...then merge them.
  }
  if (options.log) {
    console.log('\nData:');
    console.log(json);
  }
  return json;
}
/**
 * Saves a csv/tsv file to disk asynchronously
 * @param json The json data to save as a csv/tsv file
 * @param filepath The path to save the csv/tsv file to
 * @param options Options to save the csv/tsv file with
 * @returns {void}
 */
export async function save(json: any[] | string, filepath: string, options: Options = defaultOptions): Promise<void> {
  // Parse first if json is stringified
  json = _parseIfStringified(json);
  const header: string = _valuesToRecord(Object.keys(json[0]), options.delimiter);
  const csvData: string = json
    .reduce((records, recordData) => {
      const record: string = _valuesToRecord(Object.values(recordData), options.delimiter);
      return records + record;
    }, header)
    .toString();
  if (options.log) console.log(csvData);
  await fsp.writeFile(filepath, csvData, options.encoding);
}
/**
 * Parses json data if it is stringified, returns json data if not. Casts data to Array<any> before returning
 * @private
 * @static
 * @method
 * @param json Json data to parse
 * @returns {Array<any>} Parsed JSON data
 */
function _parseIfStringified(json: any[] | string): any[] {
  if (typeof json === typeof String) {
    json = JSON.parse(json as string);
  }
  return json as any[];
}
/**
 * Converts an array of values to a string representation of a csv/tsv record
 * @private
 * @static
 * @method
 * @param values Values to convert
 * @param delimiter Delimiter to separate values by in the resulting record
 * @returns {string} String representation of a csv/tsv record
 */
function _valuesToRecord(values: any[], delimiter: string): string {
  return values.join(delimiter) + '\n';
}
