import { Access } from './types';
import { Author } from './interfaces/author';
import { Editor } from './interfaces/editor';
import { Keyword } from './interfaces/keyword';
import { Conference } from './interfaces/conference';
import { Metadata } from './interfaces/metadata';
import { Issue } from './interfaces/issue';
import { CustomDate } from './interfaces/customDate';
import * as Csv from '../util/csv';
import NameParser from './name-parser/nameParser';
import { Name } from './name-parser/name';

export class Article {
    authors?: Array<Author>;
    editors?: Array<Editor>;
    beginningPage?: number;
    //public groupAuthors: Array<Author>;
    conferences?: Array<Conference>;
    metadata?: Metadata;
    doi?: string;
    endingPage?: number;
    access?: Access;
    publicationDate?: CustomDate;
    //public type: PublicationType;
    title?: string;
    issue?: Issue;
    language?: string;
    keywords?: Keyword[];
    abstract?: string;
    pubmedId?: string;

    static async fromCsv(path: string): Promise<Article[]> {
        const rows: any[] = await Csv.read(path);
        const articles: Article[] = [];

        for (const row of rows) {
            articles.push({
                keywords: Article._keywordsFromCsv(row.DE, row.ID),
                issue: Article._issueFromCsv(row.IS, row.SI),
                abstract: row.AB,
                title: row.TI,
                language: row.LA,
                pubmedId: row.PM,
                access: Article._accessFromCsv(row.OA),
                beginningPage: row.BP.replace(/\D/, ''),
                endingPage: row.EP.replace(/\D/, ''),
                doi: row.DI,
                publicationDate: Article._publicationDateFromCsv(row.PD, row.PY),
                metadata: Article._metadataFromCsv(row.DA, row.SC, row.U1, row.U2, row.UT, row.WC, row.Z9),
                authors: Article._authorsFromCsv(row.AF, row.AU, row.EM, row.OI, row.RI, row.C1),
                editors: Article._editorsFromCsv(row.BE)
            });
        }
        
        return articles;
    }

    //private static _conferencesFromCsv(fullName: string): Conference[] {
    //
    //}

    private static _editorsFromCsv(fullName: string): Editor[] {
        const rawNames: string[] = fullName.split('; ');

        const editors: Editor[] = [];
        for (const raw of rawNames) {
            editors.push({ name: NameParser.parseName(raw) });
        }

        return editors;
    }

    private static _authorsFromCsv(fullName: string, name: string, email: string, orcid: string, researcherId: string, address: string): Author[] {
        const rawFullNames: string[] = fullName.split('; ');
        const rawNames: string[] = name.split('; ');
        const rawEmails: string[] = email.split('; ');
        const rawOrcid: string[] = orcid.split('; ');
        const rawResearcherId: string[] = researcherId.split('; ');
        const rawAddress: string[] = address.split('; ');

        const authors: Author[] = [];
        for (let i = 0; i < rawFullNames.length; i++) {
            let name: Name;
            try {
                name = NameParser.parseName(rawFullNames[i]);
            } catch {
                name = NameParser.parseName(rawNames[i]);
            } finally {
                if (name != null) authors.push({ name });
            }
        }

        if (rawEmails.length === authors.length) {
            for (const [index, raw] of rawEmails.entries()) {
                authors[index].email = rawEmails[index].trim()
            }
        }

        for (const raw of rawOrcid) {
            const [name, orcid] = raw.split('/');
            const parsed = NameParser.parseName(name);
            for (const author of authors) {
                if (author.name.first === parsed.first && author.name.last === parsed.last) {
                    author.orcid = orcid;
                    continue;
                }
            }
        }

        for (const raw of rawResearcherId) {
            const [name, researcherId] = raw.split('/');
            const parsed = NameParser.parseName(name);
            for (const author of authors) {
                if (author.name.first === parsed.first && author.name.last === parsed.last) {
                    author.researcherId = researcherId;
                    continue;
                }
            }
        }

        for (const raw of rawAddress) {
            const [name, address] = raw.split('] ');
            const parsed = NameParser.parseName(name);
            for (const author of authors) {
                if (author.name.first === parsed.first && author.name.last === parsed.last) {
                    author.address = address;
                    continue;
                }
            }
        }

        return authors;
    }

    private static _metadataFromCsv(reportDate: string, researchAreas: string, usageCountLast180Days: string, usageCountTotal: string, accessionNumber: string, webOfScienceCategories: string, timesCitedTotal: string): Metadata {
        return {
            reportDate: reportDate && new Date(reportDate),
            researchAreas,
            usageCountLast180Days: usageCountLast180Days && Number(usageCountLast180Days),
            usageCountTotal: usageCountTotal && Number(usageCountTotal),
            accessionNumber: accessionNumber && accessionNumber.split(':')[1],
            webOfScienceCategories,
            timesCitedTotal: timesCitedTotal && Number(timesCitedTotal)
        }
    }

    private static _publicationDateFromCsv(publicationDate: string | undefined, publicationYear: string | undefined): CustomDate {
        const seasonRegExp = /(?:SPR(?:-SUM)?)|(?:SUM(?:-FAL)?)|(?:FAL(?:-WIN)?)|(?:WIN(?:-SPR)?)/;
        const monthRegExp = /(?:JAN\.?(?:-FEB\.?)?)|(?:FEB\.?(?:-MAR\.?)?)|(?:MAR\.?(?:-APR\.?)?)|(?:APR\.?(?:-MAY\.?)?)|(?:MAY\.?(?:-JUN\.?)?)|(?:JUN\.?(?:-JUL\.?)?)|(?:JUL\.?(?:-AUG\.?)?)|(?:AUG\.?(?:-SEP\.?)?)|(?:SEP\.?(?:-OCT\.?)?)|(?:OCT\.?(?:-NOV\.?)?)|(?:NOV\.?(?:-DEC\.?)?)|(?:DEC\.?(?:-JAN\.?)?)/;
        const dayRegExp = /(?:(?:[1-2][0-9])|(?:3[0-1])|(?:0?[1-9]))/;
        const yearRegExp = /(?:\d{4}|\d{2})/;

        const out = {} as CustomDate;
        const seasonMatches = publicationDate.match(seasonRegExp);
        if (seasonMatches && seasonMatches.length > 0) {
            out.season = seasonMatches[0];
        }

        const monthMatches = publicationDate.match(monthRegExp);
        if (monthMatches && monthMatches.length > 0) {
            out.month = monthMatches[0];
        }

        const dayMatches = publicationDate.match(dayRegExp);
        if (dayMatches && dayMatches.length > 0) {
            out.day = Number(dayMatches[0]);
        }

        const yearMatches = publicationYear.match(yearRegExp);
        if (yearMatches && yearMatches.length > 0) {
            out.day = Number(yearMatches[0]);
        }
        return out;
    }

    private static _accessFromCsv(openAccess: string | undefined): Access {
        return openAccess.trim() == '' ? 'closed' : 'open';
    }

    private static _issueFromCsv(issue: string, isSpecialIssue: 'IS' | undefined): Issue {
        return {
            number: issue,
            isSpecial: isSpecialIssue == 'IS' ? true : false
        }
    }

    private static _keywordsFromCsv(authorKeywords: string[], keywordsPlus: string[]): Keyword[] {
        function unique(list: Keyword[]) {
            const seen = {} as any;
            return list.filter(function(item) {
                return seen.hasOwnProperty(item.text.toUpperCase()) ? false : (seen[item.text.toUpperCase()] = true);
            });
        }

        const keywords: Keyword[] = [];
        for (const keyword of authorKeywords) {
            keywords.push({
                text: keyword,
                type: 'author'
            });
        }
        for (const keyword of keywordsPlus) {
            keywords.push({
                text: keyword,
                type: 'webOfScience'
            });
        }
        return unique(keywords);
    }

}
