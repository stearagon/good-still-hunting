import Ember from 'ember';

export default Ember.Controller.extend({
  tags: Ember.computed('model.still.tags', function(){
    return this.get('model.still.tags');
  })
});
