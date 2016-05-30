import Ember from 'ember';
import EmberValidations from "ember-validations";

export default Ember.Component.extend(EmberValidations, {
  session: Ember.inject.service('session'),

  createdTags: null,

  errorMessage: null,
  image: null,
  movie: null,
  name: null,
  submissionError: null,

  tags: Ember.computed.oneWay('startTags.[]'),


  submissionDisplayErrors: Ember.computed('submissionError', function() {
    if(this.get('submissionError')) {
      return this.get('submissionError');
    }
  }),

  tagsQuery: null,

  isValidated: false,
  showPreview: false,

  validations: {
    image: {
      presence: true
    },

    name: {
      presence: true
    },

    movie: {
      presence: true
    },

    tags: {
      length: {
        minimum: 1
      }
    }
  },

  updatePreview: function(src, el){
    el.src = src;
    this.set('image', src);
  },

  actions: {
    onCreate() {
      if(!this.get('session.isAuthenticated')) {
        this.set('isValidated', true);
        this.set('submissionDisplayErrors', [{ detail: 'Must be logged in to add stills' }]);
      } else {
        let props = this.getProperties('image', 'name', 'movie');
        let newTags = this.get('tags').map(function(tag){ return tag.get('tag'); });

        this.set('isValidated', true);

        if(this.get('isValid')) {
          this.attrs.create(newTags, props);
        }
      }
    },

    onCancel: function(){
      this.sendAction('cancel');
    },

    searchTags(value) {
      this.set('tagQuery', value);

      return this.get('store').query('tag', { query: value }).then((tags) => {
        let newTags = tags.toArray();

        if (!newTags[0]) {
          let newTag = this.get('store').createRecord('tag', { tag: value });
          newTags.unshiftObject(newTag);
        }

        return newTags;
      });
    },

    addTag(value) {
      this.set('tags', value);
    },

    fileInputChange: function(){
      var file = window.event.target.files[0];
      var reader = new FileReader();
      var previewWindow = Ember.$('.still-add-form__image')[0];

      reader.onloadend = function(){
        this.updatePreview(reader.result, previewWindow);
      }.bind(this);

      if (file) {
        reader.readAsDataURL(file);
        this.set('showPreview', true);
      } else {
        this.updatePreview("");
      }
    },

    getFile() {
      document.getElementById("upfile").click();
    },

    filmChange(movie) {
      this.set('movie', movie);
      this.attrs.onFilmChange(movie);
    },
  },
});
