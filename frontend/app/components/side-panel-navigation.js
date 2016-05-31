import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);

    if (Ember.$(document).attr('loadSidePanel') === undefined) {
      Ember.$(document).ready(() => {
        Ember.$(document).mouseup((e) => {
          var container = $('.page-side-panel');
          var hamburger = $('.fa.fa-bars');

          if (!container.is(e.target) && !hamburger.is(e.target) && container.has(e.target).length === 0) {
            this.attrs.closeSidePanel();
          }
        })
      });
    }

    Ember.$(document).attr('loadSidePanel', true);
  },

  actions: {
    toggleSidePanel() {
      this.attrs.toggleSidePanel();
    }
  }
});
