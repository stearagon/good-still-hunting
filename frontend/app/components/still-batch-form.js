import Ember from 'ember';
import EmberValidations from "ember-validations";
import { task } from 'ember-concurrency';

export default Ember.Component.extend(EmberValidations, {
  session: Ember.inject.service('session'),
  createdTags: null,
  errorMessage: null,
  stillData: [],
  movie: null,
  submissionError: null,
  currentStill: null,
  tags: Ember.computed.oneWay('startTags.[]'),

  stillDataLength: Ember.computed('stillData.[]', function() {
    const stillData = this.get('stillData');
    return stillData.length;
  }),

  didReceiveAttrs() {
    this.stillData.forEach((still) => {
      Ember.set(still, 'tags', this.get('tags'));
    });

    if(this.get('stillData').length > 0 && this.get('currentStill') === null) {
      this.set('currentStill', this.get('stillData')[0]);
    }
  },

  currentStillIndex: Ember.computed(
    'stillData.[]',
    'currentStill',
    'stillDataLength',
    function() {
      const stillDataLength = this.get('stillDataLength');
      if (stillDataLength === 0) {
        return null;
      }
      const stillData = this.get('stillData');
      const current = this.get('currentStill');
      return stillData.findIndex((data) => data === current);
    }),

  showPreviousButton: Ember.computed(
    'currentStillIndex',
    'stillDataLength',
    function() {
      const stillDataLength = this.get('stillDataLength');
      if (stillDataLength <= 1) {
        return false;
      }
      const currentStillIndex  = this.get('currentStillIndex');
      return currentStillIndex >= 1;
    }),

  showNextButton: Ember.computed(
    'currentStillIndex',
    'stillDataLength',
    function() {
      const stillDataLength = this.get('stillDataLength');
      if (stillDataLength <= 1) {
        return false;
      }
      const currentStillIndex  = this.get('currentStillIndex');
      return currentStillIndex < stillDataLength - 1;
    }),

  submissionDisplayErrors: Ember.computed('submissionError', function() {
    if(this.get('submissionError')) {
      return this.get('submissionError');
    }
  }),

  tagsQuery: null,
  showPreview: false,

  actions: {
    onCreate() {
      const that = this;

      if(!this.get('session.isAuthenticated')) {
        this.set('isValidated', true);
        this.set('submissionDisplayErrors', [{ detail: 'Must be logged in to add stills' }]);
      } else {
        const stillData = this.get('stillData');
        this.attrs.create(stillData);
      }
    },

    onCancel: function(){
      this.sendAction('cancel');
    },

    // image actions
    uploadImage(file) {
      const that = this;
      const stillData = this.get('stillData');
      file.readAsDataURL().then(function (url) {
        const newStill = { file: url, tags: that.get('tags'), errors: [] };
        stillData.pushObject(newStill);
        if (stillData.length === 1) {
          that.set('currentStill', newStill);
        }
      });
    },

    addTag(value) {
      this.set('currentStill.tags', value);
    },

    // multi file navigation
    selectImage(direction) {
      const stillData = this.get('stillData');
      const current = this.get('currentStill');
      const currentIdx = stillData.findIndex((data) => data  === current);
      this.set('currentStill', stillData[currentIdx + direction]);
    },
  },

  // validation
  isValidated: false,
  validations: {
    stillData: {
      length: {
        minimum: 1
      }
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
});
