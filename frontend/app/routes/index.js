import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Route.extend({
  queryParams: {
    searchInput: { refreshModel: true },
    tagId: { refreshModel: true },
    page: { refreshModel: false },
    perPage: { refreshModel: false }
  },

  perPage: 25,

  model: function(queryParams, transition){
    const params = this.buildQueryParams(queryParams);
    return this.store.find('still', params);
  },

  buildQueryParams: function(queryParams) {
    var params = {};
    
    if (queryParams.searchInput) {
      _.extend(params, { search_input: queryParams.searchInput });
    }

    if (queryParams.tagId) {
      _.extend(params, { tag_id: queryParams.tagId });
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
