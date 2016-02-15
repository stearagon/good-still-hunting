import Ember from 'ember';

export default Ember.Controller.extend({
  searchController: Ember.inject.controller('dashboard.stills.search'),
  session: Ember.inject.service('session'),

  actions: {
    logout() {
      this.get('session').invalidate();
    },

    searchStills(searchInput) {
      let searchController = this.get('searchController');

      if(searchController) {
        searchController.set('page', 1);
        searchController.set('searchInput', searchInput);
      }

      this.transitionToRoute('dashboard.stills.search');
    },
  },
});
