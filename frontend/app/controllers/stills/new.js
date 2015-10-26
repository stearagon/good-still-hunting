import Ember from 'ember';

export default Ember.Controller.extend({
  movies: Ember.computed('movies', function(){
    return this.store.findAll('movie');
  }),

  isValid: Ember.computed(
    'model.movie', 'model.name', 'model.image', function() {
      return !Ember.isEmpty(this.get('model.movie')) &&
      !Ember.isEmpty(this.get('model.name')) &&
      !Ember.isEmpty(this.get('model.image'));
      // !Ember.isEmpty(this.get('model.tags'));
    }
  ),

  updatePreview: function(src, el){
    el.src = src;
    this.model.set('image', src);
  },

  actions: {
    create: function(){
      if(this.get('isValid')) {
        this.get('model').save().then(function(still) {
          this.transitionToRoute('stills.still', still);
        }.bind(this));
      } else {
        this.set('errorMessage', 'You have to fill all the fields');
      }

      return false;
    },

    cancel: function(){
      this.transitionToRoute('stills');
      return false;
    },

    fileInputChange: function(){
      var file = window.event.target.files[0];
      var reader = new FileReader();
      var previewWindow = window.event.target.nextElementSibling;

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
