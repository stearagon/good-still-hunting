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
    this.set('tagId', '');
    this.set('page', 1);
  },

  actions: {
    loadNext() {
      var that = this;
      var metaData = this.get('model.stills.meta');
      var params = {};

      if (metaData.total_pages > this.get('page')) {
        this.set('page', parseInt(this.get('page')) + 1);

        if (this.get('page')) {
          _.extend(params, { page: this.get('page')});
        }

        if (this.get('perPage')) {
          _.extend(params, { per_page: this.get('perPage') });
        }

        if (this.get('tagId')) {
          _.extend(params, { tag_id: this.get('tagId') });
        }

        this.store.findQuery('still', params).then(function(stills) {
          let meta = that.get('model.stills.meta');
          that.set('model.stills', that.get('model.stills').toArray().addObjects(stills.toArray()));
          that.set('model.stills.meta', meta);
        });
      }
    }
  }
});
