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

    return Ember.RSVP.hash({
      movie: this.store.findRecord('movie', params.movie_id),
      stills: this.store.query('still', params)
    });
  },

  setupController(controller,model) {
    controller.set('filmId', model.movie.id);
    controller.set('meta', model.stills.meta);
    controller.set('stills', model.stills);
    controller.set('movie', model.movie);
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

    if (queryParams.film_id) {
      _.extend(params, { movie_id: queryParams.film_id });
    }

    return params;
  }
});
