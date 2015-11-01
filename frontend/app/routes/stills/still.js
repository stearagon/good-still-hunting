import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return Ember.RSVP.hash({
      still: this.store.findRecord('still', params.still_id),
      tags: this.store.query('tag', { still_id: params.still_id }),
      stillsTags: this.store.query('stillsTag', { still_id: params.still_id })
    });
  }
});
