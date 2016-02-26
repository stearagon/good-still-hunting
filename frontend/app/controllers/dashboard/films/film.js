import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    { perPage: 'per_page' },
    'page',
  ],

  page: 1,
  perPage: 12,
  filmId: null,

  resetData: function() {
    this.set('page', 1);
  }
});
