import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    onLoadNext: function() {
      this.sendAction('loadNext');
    }
  }
});
