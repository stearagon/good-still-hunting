import Ember from 'ember';
import _ from 'lodash/lodash';
import ResetScroll from 'frontend/mixins/reset-scroll';

const { service } = Ember.inject;

export default Ember.Route.extend(ResetScroll, {
  session: service('session'),
  queryParams: {
    searchInput: { refreshModel: true },
    page: { refreshModel: false },
    perPage: { refreshModel: false }
  },

  perPage: 25,

  model: function(queryParams){
    const params = this.buildQueryParams(queryParams);
    _.extend(params, { seed: Math.random() * (1000000 - 1) + 1 });
    return this.store.query('still', params);
  },

  setupController(controller, model) {
    controller.set('meta', model.meta);
    controller.set('stills', model);
  },

  resetController: function(controller, isExiting) {
      this._super.apply(this, arguments);

      if (isExiting) {
        controller.resetData();
      }
  },

  buildQueryParams: function(queryParams) {
    var params = {};

    if (queryParams.searchInput) {
      _.extend(params, { search_input: queryParams.searchInput });
    }

    if (queryParams.page) {
      _.extend(params, { page: queryParams.page });
    }

    if (queryParams.perPage) {
      _.extend(params, { per_page: queryParams.perPage });
    }

    return params;
  },
});
