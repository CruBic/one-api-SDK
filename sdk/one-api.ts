import { HttpHelper } from './http-helper';
import { ONE_API_URL, ONE_API_ROUTES, Book, RequestOptions, Movie, Character, Quote, Chapter } from './constants';

export class OneApi {
  private http: HttpHelper;

  constructor(authToken: string) {
    this.http = new HttpHelper(authToken);
  }

  getBooks(options: RequestOptions<Book>) {
    return this.http.requestMany<Book>({url: `${ONE_API_URL}${ONE_API_ROUTES.book}`, ...options});
  }

  getBook(id: string) {
    return this.http.request<Book>(`${ONE_API_URL}${ONE_API_ROUTES.book}/${id}`);
  }

  getBookChapters(id: string, options: RequestOptions<Chapter>) {
    return this.http.requestMany<Chapter>({url: `${ONE_API_URL}${ONE_API_ROUTES.book}/${id}/${ONE_API_ROUTES.chapter}`, ...options});
  }

  getMovies(options: RequestOptions<Movie>) {
    return this.http.requestMany<Movie>({url: `${ONE_API_URL}${ONE_API_ROUTES.movie}`, ...options});
  }

  getMovie(id: string) {
    return this.http.request<Movie>(`${ONE_API_URL}${ONE_API_ROUTES.movie}/${id}`);
  }

  getMovieQuotes(id: string, options: RequestOptions<Quote>) {
    return this.http.requestMany<Quote>({url: `${ONE_API_URL}${ONE_API_ROUTES.movie}/${id}/${ONE_API_ROUTES.quote}`, ...options});
  }

  getCharacters(options: RequestOptions<Character>) {
    return this.http.requestMany<Character>({url: `${ONE_API_URL}${ONE_API_ROUTES.character}`, ...options});
  }

  getCharacter(id: string) {
    return this.http.request<Character>(`${ONE_API_URL}${ONE_API_ROUTES.character}/${id}`);
  }

  getCharacterQuotes(id: string, options: RequestOptions<Quote>) {
    return this.http.requestMany<Quote>({url: `${ONE_API_URL}${ONE_API_ROUTES.character}/${id}/${ONE_API_ROUTES.quote}`, ...options});
  }

  getQuotes(options: RequestOptions<Quote>) {
    return this.http.requestMany<Quote>({url: `${ONE_API_URL}${ONE_API_ROUTES.quote}`, ...options});
  }

  getQuote(id: string) {
    return this.http.request<Quote>(`${ONE_API_URL}${ONE_API_ROUTES.quote}/${id}`);
  }

  getChapters(options: RequestOptions<Chapter>) {
    return this.http.requestMany<Chapter>({url: `${ONE_API_URL}${ONE_API_ROUTES.chapter}`, ...options});
  }

  getChapter(id: string) {
    return this.http.request<Chapter>(`${ONE_API_URL}${ONE_API_ROUTES.chapter}/${id}`);
  }
}