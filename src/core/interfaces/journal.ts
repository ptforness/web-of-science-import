import { Volume } from './volume';

export interface Journal {
    eISSN?: string;
    ISSN?: string;
    volumes?: Array<Volume>;
}
