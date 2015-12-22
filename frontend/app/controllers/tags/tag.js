import Ember from 'ember';
import _ from 'lodash/lodash';

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
