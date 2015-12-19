import Ember from 'ember';

export default Ember.Controller.extend({
  tags: Ember.computed('model.still.tags', function(){
    debugger;
    return this.get('model.still.tags');
  })
});
