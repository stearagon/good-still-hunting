import Ember from 'ember';

export default Ember.Controller.extend({
  textTags: Ember.computed('model.tags', function(){
    const tags = this.get('model.tags');
    let text = [];
    tags.forEach(function(tag){
      text.push(tag.get('tag'));
    });
    
    return text;
  })
});
