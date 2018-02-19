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
  loading: false,
  stillData: [],

  getDefaultTags: function(movie) {
    const that = this;
    let tags = this.store.query('tag', { movie_id: movie.get('id') }).then((tags) => {
      that.set('tags', tags);
    });
  },

  create: function(tags, props){
    var that = this;
    let still = this.store.createRecord('still');
    still.setProperties(props);

    return still.save().then((still) => {
      var tagPromises = [];
      tags.forEach(function(tag){
        const tagRecord = that.store.peekAll('tag').findBy('tag', tag);
        if (tagRecord.id) {
          tagPromises.push(Promise.resolve(tagRecord));
        } else {
          var newTag = that.store.createRecord('tag', {
            tag: tag
          });

          tagPromises.push(newTag.save());
        }
      })

      return Ember.RSVP.all(tagPromises).then(function(tagRecords) {
        var stillsTagPromises = [];
        tagRecords.forEach(function(record) {
          var stillsTag = that.store.createRecord('stillsTag', {
            tag: record,
            still: still,
          });

          stillsTagPromises.push(stillsTag.save());
        });

        return Ember.RSVP.all(stillsTagPromises);
      });
    }, (errors) => {
      this.set('submissionError', errors.errors);
    });
  },

  actions: {
    filmChange(movie) {
      this.set('movie', movie);
      this.getDefaultTags(movie);
    },

    createMultiple(arr) {
      const that = this;
      that.set('loading', true);
      const stillsPromises = [];
      arr.forEach((data) => {
        const props = {
          image: data.file,
          movie: that.get('movie'),
        };

        let newTags = data.tags.map(function(tag){ return tag.get('tag'); });

        stillsPromises.push(that.create(newTags, props));
      });

      return Ember.RSVP.all(stillsPromises).then(function(stillRecords) {
        that.set('loading', false);
        that.set('stillData', []);
        that.set('tags', []);
        window.setTimeout(() => that.set('movie', null), 3000);
        that.transitionToRoute('dashboard.films.film', that.get('movie.title'));
      });
    },

    create(newTags, props) {
      const that = this;
      that.set('loading', true);
      that.create(newTags, props).then(() => {
        that.set('loading', false);
        that.set('tags', []);
        window.setTimeout(() => that.set('movie', null), 3000);
        that.transitionToRoute('dashboard.films.film', that.get('movie.title'));
      });
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
