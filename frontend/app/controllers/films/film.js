import Ember from 'ember';
import _ from 'lodash/lodash';

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
  },

  actions: {
    loadNext() {
      var that = this;
      var metaData = this.get('meta');
      var params = {};

      if (metaData.total_pages > this.get('page')) {
        this.set('page', parseInt(this.get('page')) + 1);

        if (this.get('page')) {
          _.extend(params, { page: this.get('page')});
        }

        if (this.get('perPage')) {
          _.extend(params, { per_page: this.get('perPage') });
        }
        if (this.get('filmId')) {
          _.extend(params, { movie_id: this.get('filmId') });
        }

        this.store.findQuery('still', params).then(function(stills) {
          let meta = stills.meta;
          that.set('stills', that.get('stills').toArray().addObjects(stills.toArray()));
          that.set('meta', meta);
        });
      }
    }
  }
});
