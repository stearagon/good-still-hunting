
import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Route.extend({
  queryParams: {
    page: { refreshModel: false },
    perPage: { refreshModel: false }
  },

  perPage: 25,

  model: function(params){
    return this.store.findRecord('movie', params.film_id);
  },

  setupController(controller, model) {
    controller.set('stills', model.get('stills'));
  },

  resetController: function(controller, isExiting) {
      this._super.apply(this, arguments);

      if (isExiting) {
        controller.resetData();
      }
  },

  buildQueryParams: function(queryParams) {
    var params = {};

    if (queryParams.page) {
      _.extend(params, { page: queryParams.page });
    }

    if (queryParams.perPage) {
      _.extend(params, { per_page: queryParams.perPage });
    }

    return params;
  }
});
