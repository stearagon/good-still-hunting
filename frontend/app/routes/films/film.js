
import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return this.store.findRecord('movie', params.film_id);
  },

  setupController(controller, model) {
    controller.set('stills', model.get('stills'));
  }

});
