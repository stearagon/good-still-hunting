import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['sessions'],

  currentUser: Ember.computed('controllers.sessions.currentUser', function() {
    return this.get('controllers.sessions.currentUser')
  }),

  isAuthenticated: Ember.computed('controllers.sessions.currentUser', function() {
    return !Ember.isEmpty(this.get('controllers.sessions.currentUser'));
  }),

  actions: {
    searchStills: function(searchInput){
      this.transitionToRoute('stills.search', { queryParams: { searchInput: searchInput }});
    }
  }
});
