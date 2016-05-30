import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleSidePanel() {
      this.attrs.toggleSidePanel();
    }
  }
});
