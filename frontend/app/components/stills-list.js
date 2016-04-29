import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
  filmId: null,
  isLoading: 0,
  meta: null,
  page: null,
  perPage: null,
  stills: null,
  tag: null,

  stillSoloSelected: null,
  stillSoloSelectedMovie: null,
  stillSoloSelectedTags: null,

  stillFormOpen: false,

  endOfList: Ember.computed('meta', 'page', function() {
    return this.get('meta').total_pages === this.get('page');
  }),

  didInsertElement() {
    this._super(...arguments);

    if (Ember.$(document).attr('loaded') === undefined) {
      Ember.$(document).ready(function(){
        Ember.$('body').height(Ember.$(document).height() + 1);
        Ember.$(window).scroll(function() {
          if(Ember.$(window).height() + Ember.$(window).scrollTop() === Ember.$(document).height()) {
            if(Ember.$('.load-button')){
              Ember.$('.load-button').click();
            }
          }
        });

        Ember.$(window).on('touchstart', function() {
          if(Ember.$(window).height() + Ember.$(window).scrollTop() === Ember.$(document).height()) {
            if(Ember.$('.load-button')){
              Ember.$('.load-button').click();
            }
          }
        });
      });
    }

    Ember.$(document).attr('loaded', true);
  },

  actions: {
    toggleStillSoloModal(still) {
      this.store.findRecord('still', still.id).then((still) => {
        this.set('stillSoloSelected', still);

        still.get('movie').then((movie) => {
          debugger;
          this.set('stillSoloSelectedMovie', movie);
        });
      });

      this.store.query('tag', { still_id: still.id}).then((tags) => {
        this.set('stillSoloSelectedTags', tags);
      });

      if(still.id === this.get('stillSoloSelected.id') || (still.id !== this.get('stillSoloSelected.id') && !this.get('stillFormOpen'))) {
        this.toggleProperty('stillFormOpen');
      }
    },

    onLoadNext() {
      var params = {};

      if (this.get('meta').total_pages > this.get('page')) {
        this.set('isLoading', this.get('isLoading') + 1);
        this.set('page', parseInt(this.get('page')) + 1);

        if (this.get('searchInput')) {
          _.extend(params, { search_input: this.get('searchInput') });
        }

        if (this.get('page')) {
          _.extend(params, { page: this.get('page')});
        }

        if (this.get('perPage')) {
          _.extend(params, { per_page: this.get('perPage') });
        }

        if (this.get('filmId')) {
          _.extend(params, { movie_id: this.get('filmId') });
        }

        if (this.get('tag')) {
          _.extend(params, { tag_id: this.get('tag.id') });
        }

        this.get('store').query('still', params).then((model) => {
          this.set('stills', this.get('stills').toArray().addObjects(model.toArray()));
          this.set('meta', model.meta);

          Ember.run.later(() => {
              this.set('isLoading', this.get('isLoading') - 1);
          }, 1000);
        });
      }
    }
  }
});
