import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ResetScroll from 'frontend/mixins/reset-scroll';

export default Ember.Route.extend(ApplicationRouteMixin, ResetScroll, {
});
