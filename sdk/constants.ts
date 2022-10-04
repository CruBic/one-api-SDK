export const ONE_API_URL = 'https://the-one-api.dev/v2';
export const ONE_API_ROUTES = {
  book: '/book',
  chapter: '/chapter',
  movie: '/movie',
  quote: '/quote',
  character: '/character',
};

export interface Collection<T> {
  docs: T[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

export interface Response<T> {
  value: Collection<T> | null;
  status: number;
  error: string | null;
}

export interface Book {
  _id: string;
  name: string;
}

export interface Movie {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
}

export interface Character {
  _id: string;
  death: string;
  birth: string;
  hair: string;
  realm: string;
  height: string;
  spouse: string;
  gender: string;
  name: string;
  race: string;
  wikiUrl: string;
}

export interface Quote {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
  id: string;
}

export interface Chapter {
  _id: string;
  chapterName: string;
  book: string;
}

export interface Pager{
  limit?: number;
  page?: number;
  offset?: number;
}


export enum SortOrder{
  ASC='asc',
  DESC='desc'
}

export enum FilterOperator {
  MATCH,
  N_MATCH,

  INCLUDE,
  EXCLUDE,

  EXISTS,
  N_EXISTS,

  REGEX,
  N_REGEX,

  LESS,
  EQUAL,
  GREATER,
  GREATER_EQUAL,
  LESS_EQUAL,
}

type sort<T> = {
  field: keyof T, 
  order: SortOrder
}

type filter<T> = {
  field: keyof T;
  operator: FilterOperator;
  value?: string | number;
}

export interface RequestOptions<T> {
  sort?: sort<T>;
  pager?: Pager;
  filter?: filter<T>[];
}

export interface RequestConfig<T> extends RequestOptions<T> {
  url: string;
}