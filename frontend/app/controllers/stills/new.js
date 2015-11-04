import Ember from 'ember';

export default Ember.Controller.extend({
  movies: null,
  still: null,

  actions: {
    create: function(tags){
      var that = this;

      that.get('still').save().then(function(still){

        tags.forEach(function(tag){
          var newTag = that.store.createRecord('tag', {
            tag: tag
          });

          newTag.save().then(function(tag){
            var stillsTag = that.store.createRecord('stillsTag', {
              tag: tag,
              still: that.get('still')
            });

            var stillsTagPromises = new Array();
            stillsTagPromises.push(stillsTag.save());

            Ember.RSVP.all(stillsTagPromises).then(function() {
              that.transitionTo('stills.still', that.get('still.id'));
            });
          })
        });
      });

      return false;
    },

    cancel: function(){
      this.transitionTo('stills');
      return false;
    }
  }


});
