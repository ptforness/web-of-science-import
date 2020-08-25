import { Book } from '../book';

export interface Series {
    name?: string;
    books?: Array<Book>;
}
