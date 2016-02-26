import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    { perPage: 'per_page' },
    'page',
  ],

  page: 1,
  perPage: 12,
  meta: null,
  tag: null,

  resetData: function() {
    this.set('tagId', '');
    this.set('page', 1);
  }
});
