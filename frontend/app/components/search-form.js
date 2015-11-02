import Ember from 'ember';

export default Ember.Component.extend({
  searchInput: '',

  actions: {
    submitSearch: function(){
      this.sendAction('searchStills', this.get('searchInput'));
    }
  }
});
