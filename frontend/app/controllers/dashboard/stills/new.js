import Ember from 'ember';

export default Ember.Controller.extend({
  movies: null,
  still: null,
  submissionError: null,

  actions: {
    create: function(tags, props){
      var that = this;
      let still = that.get('still');
      still.setProperties(props);

      still.save().then((still) => {
        tags.forEach(function(tag){
          var newTag = that.store.createRecord('tag', {
            tag: tag
          });

          newTag.save().then(function(tag){
            var stillsTag = that.store.createRecord('stillsTag', {
              tag: tag,
              still: that.get('still')
            });

            var stillsTagPromises = [];
            stillsTagPromises.push(stillsTag.save());

            Ember.RSVP.all(stillsTagPromises).then(function() {
              that.transitionToRoute('dashboard.stills.still', that.get('still.id'));
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
  },
});
