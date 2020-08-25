import { Issue } from './issue';
import { Journal } from './journal';

export interface Volume {
    number?: number;
    journal?: Journal;
    issues?: Array<Issue>;
}
