import Ember from 'ember';

export default Ember.Component.extend({
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
