import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service('session'),
  model: function(params){
    return Ember.RSVP.hash({
      still: this.store.findRecord('still', params.still_id),
      tags: this.store.query('tag', { still_id: params.still_id })
    });
  }
});
