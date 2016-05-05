import Ember from 'ember';

export default Ember.Controller.extend({
  classNames: ['still-show'],

  tags: Ember.computed('model.still.tags', function(){
    return this.get('model.still.tags');
  })
});
