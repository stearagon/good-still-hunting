import Ember from 'ember';

export default Ember.Controller.extend({
  classNames: ['films-list'],

  filmSort: ['title:asc'],

  films: Ember.computed.sort('model', 'filmSort'),
});
