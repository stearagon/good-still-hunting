import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    logout() {
      this.get('session').invalidate();
    },

    searchStills(searchInput) {
      let queryParams = { page: 1, searchInput: searchInput };

      this.transitionToRoute('dashboard.stills.search', { queryParams: queryParams });
    },
  },
});
