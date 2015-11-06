import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    { perPage: 'per_page' },
    'page',
  ],

  page: 1,
  perPage: 20,

  actions: {
    loadNext: function() {
      var that = this;
      var metaData = this.store.metadataFor('still');
      var params = { page: parseInt(metaData.page) + 1, per_page: metaData.per_page };

      this.store.findQuery('still', params).then(function(stills) {
        that.set('model', that.get('model').toArray().addObjects(stills.toArray()));
      });
    }
  }
});
