import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    { searchInput: 'search_input' },
    { perPage: 'per_page' },
    'page',
  ],

  page: 1,
  perPage: 5,

  searchInput: '',

  resetData: function() {
    this.set('searchInput', '');
  }
});
