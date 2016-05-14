import Ember from 'ember';
import _ from 'lodash/lodash';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResetScroll from 'frontend/mixins/reset-scroll';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScroll, {
  session: service('session'),

  queryParams: {
    page: { refreshModel: false },
    perPage: { refreshModel: false }
  },

  perPage: 25,

  model: function(queryParams){
    const params = this.buildQueryParams(queryParams);
    return this.store.query('still', params);
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
  },

  resetController: function(controller, isExiting) {
      this._super.apply(this, arguments);

      if (isExiting) {
        controller.resetData();
      }
  },
});
