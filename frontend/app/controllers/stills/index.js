import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Controller.extend({
  queryParams: [
    { searchInput: 'search_input' },
    { perPage: 'per_page' },
    'page',
  ],

  page: 1,
  perPage: 5,

  searchInput: '',

  actions: {
    loadNext: function() {
      var that = this;
      var metaData = this.store.metadataFor('still');
      var params = { page: parseInt(metaData.page) + 1, per_page: metaData.per_page, search_input: this.get('searchInput')};

      this.store.findQuery('still', params).then(function(stills) {
        that.set('model', that.get('model').toArray().addObjects(stills.toArray()));
      });
    }
  }
});
