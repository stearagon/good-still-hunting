import Ember from 'ember';

export default Ember.Route.extend({
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
