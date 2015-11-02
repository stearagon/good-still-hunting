import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    searchInput: { refreshModel: true }
  },

  model: function(queryParams, transition){
    return this.store.query('still', { search_input: queryParams.searchInput });
  },

  resetController: function(controller, isExiting, transition) {
      this._super.apply(this, arguments);
      debugger;
      if (isExiting) {
          controller.resetData();
      }
  }
});
