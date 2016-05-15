import Ember from 'ember';
import ResetScroll from 'frontend/mixins/reset-scroll';

const { service } = Ember.inject;

export default Ember.Route.extend(ResetScroll, {
  session: service('session'),

  model() {
    return this.store.findAll('movie');
  }
});
