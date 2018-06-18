import Ember from 'ember';
import EmberValidations from "ember-validations";

export default Ember.Component.extend(EmberValidations, {
  session: Ember.inject.service('session'),
  errorMessage: null,
  image: null,
  submissionError: null,
  tags: Ember.computed.oneWay('startTags.[]'),
  isValidated: false,
  showPreview: false,
  tagsQuery: null,

  didRender() {
    this._super(...arguments);
    const image = this.get('image');
    if (image) {
      const previewWindow = Ember.$('.still-add-form__image')[0];
      this.set('showPreview', true);
      this.updatePreview(image, previewWindow);
    }
  },

  submissionDisplayErrors: Ember.computed('submissionError', function() {
    if(this.get('submissionError')) {
      return this.get('submissionError');
    }
  }),

  updatePreview: function(src, el){
    el.src = src;
  },

  actions: {
    searchTags(value) {
      this.set('tagQuery', value);

      // return this.get('store').query('tag', { query: value }).then((tags) => {
        let newTags = [];

        // if (Ember.isEmpty(newTags) || newTags[0].get('tag') !== value) {
          let newTag = this.get('store').createRecord('tag', { tag: value });
          newTags.unshiftObject(newTag);
        // }

        return newTags;
      // });
    },

    addTag(value) {
      this.onTagAdd(value);
    }
  },

  // validations
  validations: {
    tags: {
      length: {
        minimum: 1
      }
    }
  },
});
