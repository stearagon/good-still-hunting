import Ember from 'ember';

export default Ember.Controller.extend({
  genres: [
            'Action',
            'Comedy',
            'Drama',
            'Mystery',
            'Thriller',
            'Documentary',
            'Horror'
          ],

  isValid: Ember.computed(
    'model.title', 'model.director', 'model.year', 'model.genre', function() {
      return !Ember.isEmpty(this.get('model.title')) &&
      !Ember.isEmpty(this.get('model.director')) &&
      !Ember.isEmpty(this.get('model.year')) &&
      !Ember.isEmpty(this.get('model.genre'));
    }
  ),

  actions: {
    create: function(){
      if(this.get('isValid')) {
        this.get('model').save().then(function() {
          this.transitionToRoute('films.index');
        }.bind(this));
      } else {
        this.set('errorMessage', 'You have to fill all the fields');
      }

      return false;
    },

    cancel: function(){
      this.transitionToRoute('films');
      return false;
    }
  }

});
