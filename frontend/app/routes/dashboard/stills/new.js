import Ember from 'ember';
import ResetScroll from 'frontend/mixins/reset-scroll';

const { service } = Ember.inject;

export default Ember.Route.extend(ResetScroll, {
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
