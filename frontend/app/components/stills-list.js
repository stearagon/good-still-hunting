import Ember from 'ember';
import _ from 'lodash/lodash';

const metaFields = [
    'searchInput',
    'page',
    'perPage',
    'movieTitle',
];

export default Ember.Component.extend({
    isLoading: 0,
    meta: null,
    page: null,
    perPage: null,
    stills: null,
    tag: null,

    stillSoloSelected: null,
    stillSoloSelectedMovie: null,
    stillSoloSelectedTags: null,

    displayTitle: Ember.computed('movieTitle', 'searchInput', function() {
        return this.get('movieTitle') ||
            this.get('searchInput') ||
            this.get('tag.tag') ||
            null;
    }),

    stillFormOpen: false,

    endOfList: Ember.computed('meta', 'page', 'isLoading', function() {
        return this.get('meta').total_pages === this.get('page') && this.get('isLoading') === 0;
    }),

    didInsertElement() {
        this._super(...arguments);

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
    },

    willDestroyElement() {
        this._super(...arguments);

        Ember.$('body').height(Ember.$(document).height() - 1);
        Ember.$(window).off();
    },

    actions: {
        openStillSoloModal(still) {
            if(!this.get('stillFormOpen')) {
                this.toggleProperty('stillFormOpen');
            }

            this.set('stillSoloSelected', still);
        },

        closeStillSoloModal() {
            this.toggleProperty('stillFormOpen');
        },

        onLoadNext() {
            var params = {};

            this.set('loading', true);

            if (this.get('meta').total_pages > this.get('page')) {
                this.set('isLoading', this.get('isLoading') + 1);
                this.set('page', parseInt(this.get('page')) + 1);

                metaFields.forEach((field) => {
                    let value = this.get(field);
                    let underscore = Ember.String.underscore(field);
                    let argumentObject = {};

                    argumentObject[underscore] = value;

                    if(value) {
                        _.extend(params, argumentObject);
                    }
                });

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
