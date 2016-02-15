import Ember from 'ember';
import _ from 'lodash/lodash';
export default Ember.Controller.extend({
  queryParams: [
    { searchInput: 'search_input' },
    { perPage: 'per_page' },
    'page',
  ],

  page: 1,
  perPage: 12,

  searchInput: '',

  resetData: function() {
    this.set('searchInput', '');
    this.set('page', 1);
  }
});
