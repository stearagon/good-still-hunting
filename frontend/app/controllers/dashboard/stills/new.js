import Ember from 'ember';

export default Ember.Controller.extend({
  movies: null,
  submissionError: null,
  tags: null,
  batch: true,
  sortedMovies: Ember.computed.sort('movies', 'filmSort'),
  filmSort: ['title:asc'],
  movie: null,
  store: null,

  getDefaultTags: function(movie) {
    let tags = this.store.query('tag', { movie_id: movie.get('id') });
    this.set('tags', tags);
  },

  actions: {
    filmChange(movie) {
      this.set('movie', movie);
      this.getDefaultTags(movie);
    },

    create: function(tags, props){
      var that = this;
      let still = this.store.createRecord('still');
      still.setProperties(props);

      still.save().then((still) => {
        tags.forEach(function(tag){
          var tagPromises = [];
          const tagRecord = that.store.peekAll('tag').findBy('tag', tag);
          if (tagRecord.id) {
            tagPromises.push(Promise.resolve(tagRecord));
          } else {
            var newTag = that.store.createRecord('tag', {
              tag: tag
            });

            tagPromises.push(newTag.save());
          }

          Ember.RSVP.all(tagPromises).then(function(tagRecords) {
            var stillsTagPromises = [];
            tagRecords.forEach(function(record) {
              var stillsTag = that.store.createRecord('stillsTag', {
                tag: record,
                still: still,
              });

              stillsTagPromises.push(stillsTag.save());
            });

            Ember.RSVP.all(stillsTagPromises).then(function(stillsTagRecords) {
              that.transitionToRoute('dashboard.films.film', still.get('movie.title'));
              window.setInterval(function(){ that.set('tags', null) }, 1000);
            });
          });
        });
      }, (errors) => {
        this.set('submissionError', errors.errors);
      });

      return false;
    },

    cancel: function(){
      this.transitionToRoute('dashboard');
      return false;
    },

    toggleBatch: function(){
      const batchState = this.get('batch');
      this.set('batch', !batchState);
    },
  },
});
