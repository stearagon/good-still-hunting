import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    {searchInput: 'search_input'},
    'page',
    'perPage'
  ],

  page: 1,
  perPage: 10,

  searchInput: '',

  resetData: function() {
    this.set('searchInput', '');
  }
});
