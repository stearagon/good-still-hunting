import Ember from 'ember';

export default Ember.Controller.extend({
  movies: null,
  still: null,

  actions: {
    create: function(tags){
      var tagPromises = new Array();
      var stillsTagPromises = new Array();
      var that = this;

      that.get('still').save().then(function(still){

        tags.forEach(function(tag){
          var newTag = that.store.createRecord('tag', {
            tag: tag
          });

          tagPromises.push(newTag.save());
          
          Ember.RSVP.all(tagPromises).then(function(tags){
              var stillsTag = that.store.createRecord('stillsTag', {
                tag: tags[tags.length - 1],
                still: that.get('still')
              });

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
