import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    searchStills: function(searchInput){
      this.transitionTo('stills', { queryParams: { searchInput: searchInput }});
    }
  }
});
