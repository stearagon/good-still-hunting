import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin,{
  isNewSerializerAPI: true,

  serialize: function(snapshot) {
    var json = {
      name: snapshot.attr('name'),
      image: snapshot.attr('image'),
      movie_id: snapshot.belongsTo('movie', { id: true })
    };

    return json;
  },
});
