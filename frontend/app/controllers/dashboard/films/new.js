import Ember from 'ember';
import EmberValidations from "ember-validations";

export default Ember.Controller.extend(EmberValidations, {
  title: null,
  director: null,
  year: null,
  genre: null,

  isValidated: false,

  validations: {
    'title': {
      presence: true
    },

    'director': {
      presence: true
    },

    'year': {
      presence: true,
      numericality: true
    },

    'genre': {
      presence: true
    }
  },

  actions: {
    create: function(){
      this.set('isValidated', true);

      this.validate().then(() => {
        let props = this.getProperties('genre', 'title', 'year', 'director');
        let movie = this.store.createRecord('movie', props);
        movie.save().then(()=> {
          this.transitionToRoute('dashboard.films.index');
        });
      })

      return false;
    },

    cancel: function(){
      this.transitionToRoute('dashboard.films');
      return false;
    }
  },

  genres: [
    'Action',
    'Comedy',
    'Drama',
    'Mystery',
    'Thriller',
    'Documentary',
    'Horror'
  ]
});
