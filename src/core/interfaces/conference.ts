import { CustomDate } from './customDate';

export interface Conference {
    location?: string;
    title?: string;
    date?: CustomDate;
    // DOI?
    // FundingAgencyAndGrantNumber?
    // FundingText?
    host?: string; // Name?
    language?: string;
    meetingAbstractNumber?: string; // ?
    sponsors?: string; // ?
}
