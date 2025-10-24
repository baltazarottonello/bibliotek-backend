export class CreateArticleDto {
  id: number;
  pmid: number;
  title: string;
  year: number;
  status: string;
  doi?: string;
  month?: number;
  types: PubTypeDto[];
  volume?: number;
  issue?: number;
  startPage?: number;
  endPage?: number;
  abstract?: string;
  authors?: AuthorDto[];
  languages?: LanguageDto[];
  mesh?: MeshDto[];
  journal: JournalDto;
}

export class AuthorDto {
  name: string;
  lastName: string;
  orcid?: string;
  affiliations?: AffiliationDto[];
}

export class AffiliationDto {
  name?: string;
}

export class LanguageDto {
  name?: string;
}

export class MeshDto {
  name?: string;
  ui?: string;
}

export class JournalDto {
  title: string;
  country: string;
  abbreviation?: string;
  issn?: string;
  issn_type?: string;
}

export class PubTypeDto {
  name: string;
}
