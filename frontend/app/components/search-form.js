import Ember from 'ember';

export default Ember.Component.extend({
  searchInput: '',

  actions: {
    submitSearch: function(){
      this.sendAction('search', this.get('searchInput'));

      this.set('searchInput', '');
    }
  }
});
