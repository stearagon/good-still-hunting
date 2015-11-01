import Ember from 'ember';

export default Ember.Component.extend({
  tags: [],
  textTags: '',

  isValid: Ember.computed( 'model.movie', 'model.name', 'model.image', function() {
      return !Ember.isEmpty(this.get('model.movie')) &&
      !Ember.isEmpty(this.get('model.name')) &&
      !Ember.isEmpty(this.get('model.image'));
    }
  ),

  unformatTags: function(){
    var splitTags = this.get('textTags').split('#');
    Array.prototype.forEach.call(splitTags, function(tag){
      if(tag.length > 0){
        this.tags.push(tag);
      };
    }.bind(this));
  },

  updatePreview: function(src, el){
    el.src = src;
    this.model.set('image', src);
  },

  actions: {
    onCreate: function(){
      if(this.get('isValid')){
        if(this.get('textTags').length > 0){
          this.unformatTags();
        };

        this.sendAction('create', this.tags);
      } else {
        this.set('errorMessage', 'You have to fill all required fields');
      }
    },

    onCancel: function(){

      this.sendAction('cancel');
    },

    fileInputChange: function(){
      var file = window.event.target.files[0];
      var reader = new FileReader();
      var previewWindow = $('img')[0];

      reader.onloadend = function(){
        this.updatePreview(reader.result, previewWindow);
      }.bind(this)

      if (file) {
        reader.readAsDataURL(file);
      } else {
        this.updatePreview("");
      }
    }
  }
});
