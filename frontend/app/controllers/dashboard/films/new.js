import Ember from 'ember';
import EmberValidations from "ember-validations";

export default Ember.Controller.extend(EmberValidations, {
  session: Ember.inject.service('session'),

  title: null,
  director: null,
  year: null,
  genre: null,
  submissionDisplayErrors: null,

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

  reset() {
    let properties = {
      title: null,
      director: null,
      year: null,
      genre: null,
      submissionDisplayErrors: null,
      isValidated: false,
    }

    this.setProperties(properties);
  },

  actions: {
    create: function(){
      if(!this.get('session.isAuthenticated')) {
        this.set('isValidated', true);
        this.set('submissionDisplayErrors', [{ detail: 'Must be logged in to add films' }])
      } else {
        this.set('isValidated', true);

        this.validate().then(() => {
          let props = this.getProperties('genre', 'title', 'year', 'director');
          let movie = this.store.createRecord('movie', props);
          movie.save().then(()=> {
            this.reset();
            this.transitionToRoute('dashboard.films.index');
          }, (errors) => {
            this.set('submissionDisplayErrors', errors.errors);
          });
        })

        return false;
      }
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
