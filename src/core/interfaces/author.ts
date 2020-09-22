/*
AuthorFullName
AuthorsInEnglish
AuthorAddress
GroupAuthors
EmailAddress
ORCID
ResearcherIdNumber
BookAuthors
BookAuthorsFullName
BookGroupAuthors

=>
Title
firstName
middleName
lastName
suffix
email
orcid
researcherId
address
*/

import { Name } from './name';

export interface Author {
  name?: Name;
  email?: string;
  orcid?: string;
  researcherId?: string;
  addresses?: string[];
}
