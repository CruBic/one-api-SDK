import { Response, SortOrder, FilterOperator, Pager, RequestConfig } from './constants';
import axios from "axios";

export class HttpHelper {
  private authToken: string;

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  public requestMany<T>({url, sort, pager, filter = []}: RequestConfig<T>) {
    let parameters: string[] = [];

    if (sort) {
      parameters = [...parameters, this.getSortString<T>(sort.field, sort.order)]
    }

    if (pager) {
      parameters = [...parameters, this.getPagerString(pager)]
    }

    if (filter.length) {
      parameters = [...parameters, ...filter.map((el: any) => this.getFilterString<T>(el.field, el.operator, el.value))]
    }

    const requestUrl = parameters.length ? `${url}?${parameters.join('&')}` : url;

    return this.request(requestUrl);
  }

  public  request<T>(url: string) {
    return axios.get(url, {headers: this.getHeader() })
    .then(res => {
      const response: Response<T> = {
        value: res.data,
        error: null,
        status: res.status
      }

      return response;
    })
    .catch(((error: any) => {
      const response: Response<T> = {
        error: error.response.statusText,
        value: null,
        status: error.response.status
      }

      return response;
    }));
  }

  private getHeader() {
    return { Authorization: `Bearer ${this.authToken}` };
  }

  private getFilterString<T>(field: Extract<keyof T, string>, operator: FilterOperator, value: string | number | null) {
    switch(operator) {
      case FilterOperator.EQUAL:
      case FilterOperator.INCLUDE:
      case FilterOperator.MATCH:
      case FilterOperator.REGEX:
        return `${field}=${value}`;
      case FilterOperator.N_MATCH:
      case FilterOperator.EXCLUDE:
      case FilterOperator.N_REGEX:
        return `${field}!=${value}`;
      case FilterOperator.EXISTS:
        return `${field}`;
      case FilterOperator.N_EXISTS:
        return `!${field}`;
      case FilterOperator.LESS:
        return `${field}<${value}`;
      case FilterOperator.LESS_EQUAL:
        return `${field}<=${value}`;
      case FilterOperator.GREATER:
        return `${field}>${value}`;
      case FilterOperator.GREATER_EQUAL:
        return `${field}>=${value}`;
      default:
        return '';
    }
  }

  private getSortString<T>(field: keyof T, operator: SortOrder) {
    return `sort=${String(field)}:${operator}`;
  }

  private getPagerString(pager: Pager) {
    const params = [];
    let property: keyof Pager;

    for(property in pager) {
      if (pager[property] == null) {
        continue;
      }
      params.push(`${property}=${pager[property]}`);
    }

    return params.join('&');
  }
}