import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    searchStills: function(searchInput){
      this.transitionToRoute('stills.search', { queryParams: { searchInput: searchInput }});
    }
  }
});
