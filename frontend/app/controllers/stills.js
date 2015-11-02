import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    {searchInput: 'search_input'}
  ],

  searchInput: '',

  resetData: function() {
    this.set('searchInput', '');
  }
});
