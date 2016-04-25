import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResetScroll from 'frontend/mixins/reset-scroll';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScroll, {
  session: service('session'),
  model: function(params){
    return Ember.RSVP.hash({
      still: this.store.findRecord('still', params.still_id),
      tags: this.store.query('tag', { still_id: params.still_id })
    });
  }
});
