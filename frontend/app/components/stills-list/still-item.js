import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',

  classNameBindings: [
    ":stills-list-items__still",
    "onPage:stills-list-items__still--on-page"
  ],

  click() {
    this.attrs.openStillSoloModal(this.get('still'));
  },

  onPage: false,

  didInsertElement() {
    this._super(...arguments);

    Ember.$(document).ready(() => {
      Ember.$(window).scroll(() => {
        this._toggleOnPage();
      });

      Ember.$(window).on('touchstart', () => {
        this._toggleOnPage();
      });
    });
  },

  didRender() {
    // this._super(...arguments);
    this._toggleOnPage();
  },

  _checkIfOnPage() {
    let el = Ember.$(this.element);
    let windowEl = Ember.$(window);
    let elTop = el.offset()["top"];
    let elBottom = elTop + el.height();
    let elPad = parseInt(el.height()) * 5;

    return elBottom >= windowEl.scrollTop() - elPad &&
      elTop <= (windowEl.scrollTop() + windowEl.height() + elPad );
  },

  _toggleOnPage() {
    if(this.element) {
      if(this._checkIfOnPage()){
        this.set('onPage', true);
      } else {
        this.set('onPage', false);
      }
    }
  },
});
