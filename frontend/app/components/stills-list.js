import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
  isLoading: 0,
  page: null,
  perPage: null,
  stills: null,
  filmId: null,
  endOfList: Ember.computed('meta', 'page', function() {
    return this.get('meta').total_pages === this.get('page');
  }),

  actions: {
    onLoadNext() {
      var params = {};

      if (this.get('meta').total_pages > this.get('page')) {
        this.set('isLoading', this.get('isLoading') + 1);
        this.set('page', parseInt(this.get('page')) + 1);

        if (this.get('page')) {
          _.extend(params, { page: this.get('page')});
        }

        if (this.get('perPage')) {
          _.extend(params, { per_page: this.get('perPage') });
        }

        if (this.get('filmId')) {
          _.extend(params, { movie_id: this.get('filmId') });
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
