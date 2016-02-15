import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service('session'),
  model: function(){
    return Ember.RSVP.hash({
      still: this.store.createRecord('still'),
      movies: this.store.findAll('movie')
    });
  },

  setupController: function(controller, models){
    controller.setProperties({
      still: models.still,
      movies: models.movies
    });
  }
});
