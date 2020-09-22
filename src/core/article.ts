import * as Csv from '../util/csv';
import { Author } from './interfaces/author';
import { Conference } from './interfaces/conference';
import { CustomDate } from './interfaces/customDate';
import { Editor } from './interfaces/editor';
import { Issue } from './interfaces/issue';
import { Keyword } from './interfaces/keyword';
import { Metadata } from './interfaces/metadata';
import { Sponsor } from './interfaces/sponsor';
import NameParser from './name-parser/nameParser';

export class Article {
  authors?: Array<Author>;
  editors?: Array<Editor>;
  beginningPage?: number;
  //public groupAuthors: Array<Author>;
  conferences?: Array<Conference>;
  metadata?: Metadata;
  doi?: string;
  endingPage?: number;
  isOpenAccess?: boolean;
  publicationDate?: CustomDate;
  //public type: PublicationType;
  title?: string;
  issue?: Issue;
  language?: string;
  keywords?: Keyword[];
  abstract?: string;
  pubmedId?: string;
  sponsors?: Sponsor[];

  static async fromCsv(path: string): Promise<Article[]> {
    const rows: any[] = await Csv.read(path);
    const articles: Article[] = [];

    for (const row of rows) {
      articles.push({
        keywords: Article._keywordsFromCsv(row.DE, row.ID),
        issue: Article._issueFromCsv(row.IS, row.SI),
        abstract: row.AB == '' ? undefined : row.AB,
        title: row.TI == '' ? undefined : row.TI,
        language: row.LA == '' ? undefined : row.LA,
        pubmedId: row.PM == '' ? undefined : row.PM,
        isOpenAccess: Article._accessFromCsv(row.OA),
        beginningPage: row.BP == '' ? undefined : row.BP.replace(/\D/, ''),
        endingPage: row.EP == '' ? undefined : row.EP.replace(/\D/, ''),
        doi: row.DI == '' ? undefined : row.DI,
        publicationDate: Article._publicationDateFromCsv(row.PD, row.PY),
        metadata: Article._metadataFromCsv(row.DA, row.SC, row.U1, row.U2, row.UT, row.WC, row.Z9),
        authors: Article._authorsFromCsv(row.AF, row.AU, row.OI, row.RI, row.C1),
        editors: Article._editorsFromCsv(row.BE),
        sponsors: await Article._sponsorsFromCsv(row.FU),
      });
    }

    return articles;
  }

  //private static _conferencesFromCsv(fullName: string): Conference[] {
  //
  //}

  public static async _sponsorsFromCsv(agencyAndGrantNumber: string): Promise<Sponsor[]> {
    const knownAgencies: any[] = await Csv.read('./lib/core/data/agencies.tsv');
    const out: Sponsor[] = [];
    const awardsRegExp = /(?<=\[).+?(?=\])/;

    const agencies: string[] = agencyAndGrantNumber.split('; ');
    agencies.forEach((agency) => {
      let newSponsor: Sponsor;

      for (const knownAgency of knownAgencies) {
        if (agency.match(knownAgency.agencyPattern)) {
          if (newSponsor == null) newSponsor = {};
          newSponsor.name = knownAgency.name;

          const awards: RegExpMatchArray = agency.match(awardsRegExp);
          if (awards != null && awards[0] != null) {
            const awardMatches: RegExpMatchArray = awards[0].match(knownAgency.awardPattern);
            if (awardMatches != null && awardMatches[0] != null) {
              awardMatches.forEach((match) => {
                if (newSponsor.grants == null) newSponsor.grants = [];
                newSponsor.grants.push(match);
              });
            }
          }

          break;
        }
      }

      if (newSponsor != null) out.push(newSponsor);
    });

    const seen: Map<string, Partial<Sponsor>> = new Map();
    for (const sponsor of out) {
      if (seen.get(sponsor.name) == null) {
        seen.set(sponsor.name, {
          ...sponsor,
        });
      } else {
        seen.set(sponsor.name, {
          name: sponsor.name,
          grants: (seen.get(sponsor.name).grants || []).concat(sponsor.grants),
        });
      }
    }
    return Array.from(seen.values());
  }

  private static _editorsFromCsv(fullName: string): Editor[] {
    const rawNames: string[] = fullName.split('; ');

    const editors: Editor[] = [];
    for (const raw of rawNames) {
      const name = NameParser.parseName(raw);
      if (name.isParsed) {
        editors.push({ name });
      }
    }

    return editors;
  }

  private static _authorsFromCsv(
    fullName: string,
    name: string,
    orcid: string,
    researcherId: string,
    address: string,
  ): Author[] {
    const rawFullNames: string[] = fullName.split('; ');
    const rawNames: string[] = name.split('; ');
    const rawOrcids: string[] = orcid.split('; ');
    const rawResearcherIds: string[] = researcherId.split('; ');
    const rawAddresses: string[] = address.split('; [');

    const authors: Author[] = [];
    rawFullNames.forEach((name, idx) => {
      authors.push({ name: NameParser.parseName(name, rawNames[idx]), addresses: [] });
    });

    rawOrcids.forEach((raw) => {
      const [name, orcid] = raw.split('/');
      const parsed = NameParser.parseName(name);
      if (parsed.isParsed) {
        authors.forEach((author) => {
          if (
            author.name.first?.toLowerCase() === parsed.first?.toLowerCase() &&
            author.name.last?.toLowerCase() === parsed.last?.toLowerCase()
          ) {
            author.orcid = orcid;
          }
        });
      }
    });

    rawResearcherIds.forEach((raw) => {
      const [name, researcherId] = raw.split('/');
      const parsed = NameParser.parseName(name);
      if (parsed.isParsed) {
        authors.forEach((author) => {
          if (
            author.name.first?.toLowerCase() === parsed.first?.toLowerCase() &&
            author.name.last?.toLowerCase() === parsed.last?.toLowerCase()
          ) {
            author.researcherId = researcherId;
          }
        });
      }
    });

    rawAddresses.forEach((raw) => {
      const [nameList, address] = raw.split('] ');
      const names: string[] = nameList.replace('[', '').split('; ');
      names.forEach((name) => {
        const parsed = NameParser.parseName(name);
        if (parsed.isParsed) {
          authors.forEach((author) => {
            if (
              author.name.first?.toLowerCase() === parsed.first?.toLowerCase() &&
              author.name.last?.toLowerCase() === parsed.last?.toLowerCase()
            ) {
              author.addresses.push(address);
            }
          });
        }
      });
    });

    return authors;
  }

  private static _metadataFromCsv(
    reportDate: string,
    researchAreas: string,
    usageCountLast180Days: string,
    usageCountTotal: string,
    accessionNumber: string,
    webOfScienceCategories: string,
    timesCitedTotal: string,
  ): Metadata {
    return {
      reportDate: reportDate && new Date(reportDate),
      researchAreas: researchAreas && researchAreas.split('; '),
      usageCountLast180Days: usageCountLast180Days && Number(usageCountLast180Days),
      usageCountTotal: usageCountTotal && Number(usageCountTotal),
      accessionNumber: accessionNumber && accessionNumber.split(':')[1],
      webOfScienceCategories: webOfScienceCategories && webOfScienceCategories.split('; '),
      timesCitedTotal: timesCitedTotal && Number(timesCitedTotal),
    };
  }

  private static _normalizeMonth(monthString: string): number | string | undefined {
    const january = /(?:JANUARY)|(?:JAN\.?)/i;
    const february = /(?:FEBUARY)|(?:FEB\.?)/i;
    const march = /(?:MARCH)|(?:MAR\.?)/i;
    const april = /(?:APRIL)|(?:APR\.?)/i;
    const may = /(?:MAY\.?)/i;
    const june = /(?:JUNE)|(?:JUN\.?)/i;
    const july = /(?:JULY)|(?:JUL\.?)/i;
    const august = /(?:AUGUST)|(?:AUG\.?)/i;
    const september = /(?:SEPTEMBER)|(?:SEP\.?)/i;
    const october = /(?:OCTOBER)|(?:OCT\.?)/i;
    const november = /(?:NOVEMBER)|(?:NOV\.?)/i;
    const december = /(?:DECEMBER)|(?:DEC\.?)/i;
    const months: RegExp[] = [
      january,
      february,
      march,
      april,
      may,
      june,
      july,
      august,
      september,
      october,
      november,
      december,
    ];

    for (const [index, month] of months.entries()) {
      if (monthString.match(month)) return index + 1;
    }

    const monthrangeRegExp = /(?:JAN\.?-FEB\.?)|(?:FEB\.?-MAR\.?)|(?:MAR\.?-APR\.?)|(?:APR\.?-MAY\.?)|(?:MAY\.?-JUN\.?)|(?:JUN\.?-JUL\.?)|(?:JUL\.?-AUG\.?)|(?:AUG\.?-SEP\.?)|(?:SEP\.?-OCT\.?)|(?:OCT\.?-NOV\.?)|(?:NOV\.?-DEC\.?)|(?:DEC\.?-JAN\.?)/i;
    const monthRangeMatches = monthString.match(monthrangeRegExp);
    if (monthRangeMatches && monthRangeMatches.length > 0) return monthRangeMatches[0];

    return undefined;
  }

  private static _publicationDateFromCsv(
    publicationDate: string | undefined,
    publicationYear: string | undefined,
  ): CustomDate {
    const seasonRegExp = /(?:SPR(?:-SUM)?)|(?:SUM(?:-FAL)?)|(?:FAL(?:-WIN)?)|(?:WIN(?:-SPR)?)/;
    const dayRegExp = /(?:(?:[1-2][0-9])|(?:3[0-1])|(?:0?[1-9]))/;
    const yearRegExp = /(?:\d{4}|\d{2})/;

    let out: CustomDate;
    const seasonMatches = publicationDate.match(seasonRegExp);
    if (seasonMatches && seasonMatches.length > 0) {
      if (out == null) out = {};
      out.season = seasonMatches[0];
    }

    const month: number | string | undefined = this._normalizeMonth(publicationDate);
    if (month != null) {
      if (out == null) out = {};
      out.month = month;
    }

    const dayMatches = publicationDate.match(dayRegExp);
    if (dayMatches && dayMatches.length > 0) {
      if (out == null) out = {};
      out.day = Number(dayMatches[0]);
    }

    const yearMatches = publicationYear.match(yearRegExp);
    if (yearMatches && yearMatches.length > 0) {
      if (out == null) out = {};
      out.year = Number(yearMatches[0]);
    }
    return out;
  }

  private static _accessFromCsv(openAccess: string | undefined): boolean {
    return !(openAccess.trim() == '');
  }

  private static _issueFromCsv(issue: string, isSpecialIssue: 'IS' | undefined): Issue {
    return {
      number: issue === '' ? undefined : issue,
      isSpecial: isSpecialIssue == 'IS' ? true : false,
    };
  }

  private static _keywordsFromCsv(authorKeywords: string, keywordsPlus: string): Keyword[] {
    function unique(list: Keyword[]) {
      const seen = {} as any;
      return list.filter(function (item) {
        return Object.prototype.hasOwnProperty.call(seen, item.text.toUpperCase())
          ? false
          : (seen[item.text.toUpperCase()] = true);
      });
    }

    const keywords: Keyword[] = [];
    for (const keyword of authorKeywords.split('; ')) {
      if (keyword == null || keyword == '') continue;
      keywords.push({
        text: keyword,
        type: 'author',
      });
    }
    for (const keyword of keywordsPlus.split('; ')) {
      if (keyword == null || keyword == '') continue;
      keywords.push({
        text: keyword,
        type: 'webOfScience',
      });
    }
    return unique(keywords);
  }
}

function zip<T>(arr1: T[], arr2: T[]): [T, T][] {
  if (arr1 == null) throw Error("Argument 'arr1' is undefined.");
  if (arr2 == null) throw Error("Argument 'arr2' is undefined.");
  if (arr1.length != arr2.length) throw Error('Array length mismatch.');
  if (arr1.length === 0) return undefined;
  const out: [T, T][] = [];
  arr1.forEach((item, idx) => {
    out.push([item, arr2[idx]]);
  });
  return out;
}
