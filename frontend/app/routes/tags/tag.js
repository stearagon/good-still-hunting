import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Route.extend({
  queryParams: {
    tagId: { refreshModel: true },
    page: { refreshModel: false },
    perPage: { refreshModel: false }
  },

  perPage: 25,

  model(queryParams) {
    const params = this.buildQueryParams(queryParams);

    return Ember.RSVP.hash({
      tag: this.store.findRecord('tag', params.tag_id),
      stills: this.store.query('still', params)
    });
  },

  resetController: function(controller, isExiting) {
      this._super.apply(this, arguments);

      if (isExiting) {
        controller.resetData();
      }
  },

  buildQueryParams: function(queryParams) {
    var params = {};

    if (queryParams.tag_id) {
      _.extend(params, { tag_id: queryParams.tag_id });
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
