import Ember from 'ember';

export default Ember.Component.extend({
  searchInput: '',

  actions: {
    submitSearch: function(){
      this.transitionTo('dashboard.stills.search', { queryParams: { searchInput: this.get('searchInput') }});
    }
  }
});
