import { OneApi } from './sdk/one-api';
import { SortOrder } from './sdk/constants';

const api = new OneApi('PDmi7iHg78SSdP9-UnLi');
api.getCharacters({pager: {limit: 10}, sort: {field: 'death', order: SortOrder.DESC}}).then(res => {
  console.log(res.value?.docs);
});