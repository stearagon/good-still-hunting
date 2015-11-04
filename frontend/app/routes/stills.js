import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    searchInput: { refreshModel: true },
    page: { refreshModel: true },
    perPage: { refreshModel: true }
  },

  perPage: 25,

  model: function(queryParams, transition){
    return this.store.query('still', queryParams)
  },

  resetController: function(controller, isExiting, transition) {
      this._super.apply(this, arguments);

      if (isExiting) {
          controller.resetData();
      }
  }
});
