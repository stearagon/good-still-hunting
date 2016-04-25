import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
  classNames: ['stills-list'],

  filmId: null,
  isLoading: 0,
  meta: null,
  page: null,
  perPage: null,
  stills: null,
  tag: null,

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
