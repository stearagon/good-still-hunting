import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
  queryParams: [
    { perPage: 'per_page' },
    'page',
  ],

  page: 1,
  perPage: 12,

  resetData: function() {
    this.set('page', 1);
  }
});
