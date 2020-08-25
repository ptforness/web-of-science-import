/*
ISBN
BeginningPage (skip)
EndingPage (to determine length)
BookSeriesSubtitle
CitedReferences?
BookDOI
AuthorKeywords
DocumentType (To decide how to parse)
DocumentDeliveryNumber?
KeywordsPlus
Language
OpenAccessIndicator
publicationYear?
ReprintAddress?
ResearchAreas?
BookSeriesTitle
SpecialIssue?
FullSourceTitle?
CoreCollectionTimesCited?
Title


Authors (type Array<Author>)
Editors (type Array<Editor>)
references (Array<Reference>)
metadata (Type)
pageCount
isbn
doi
keywords
language
access (type)
publisher (type)
series (type)
isSpecialIssue? (boolean)

title
*/

import { Author } from './interfaces/author';
import { CustomDate } from './interfaces/customDate';
import { Editor } from './interfaces/editor';
import { Keyword } from './interfaces/keyword';
import { Metadata } from './interfaces/metadata';
import { Publisher } from './interfaces/publisher';
import { Series } from './interfaces/series';
import { Access } from './types';

export interface Book {
  access?: Access;
  authors?: Array<Author>;
  doi?: string;
  editors?: Array<Editor>;
  isbn?: string;
  keywords?: Array<Keyword>;
  language?: string;
  metadata?: Metadata;
  pageCount?: number; //EndingPage
  publicationDate?: CustomDate;
  publisher?: Publisher;
  references?: Array<string>;
  series?: Series;
  title?: string;
}
