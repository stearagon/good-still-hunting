import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
  queryParams: [
    { perPage: 'per_page' },
    'page',
  ],

  page: 1,
  perPage: 24,

  resetData: function() {
    this.set('page', 1);
  },

  actions: {
    loadNext() {
      var that = this;
      var metaData = this.get('model.meta');

      var params = {};

      if (metaData.total_pages > this.get('page')) {
        this.set('page', parseInt(this.get('page')) + 1);

        if (this.get('page')) {
          _.extend(params, { page: this.get('page')});
        }

        if (this.get('perPage')) {
          _.extend(params, { per_page: this.get('perPage') });
        }

        this.store.query('still', params).then(function(stills) {
          let meta = that.get('model.meta');
          that.set('model', that.get('model').toArray().addObjects(stills.toArray()));
          that.set('model.meta', meta);
        });
      }
    }
  }
});
