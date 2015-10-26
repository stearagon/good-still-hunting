import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  serialize: function(snapshot, options) {
    debugger;
    var json = {
      name: snapshot.attr('name'),
      image: snapshot.attr('image'),
      movie_id: snapshot.belongsTo('movie', { id: true })
    };

    // if (options.includeId) {
    //   debugger;
    //   json.id = snapshot.id;
    // };

    return json;
  }
});
