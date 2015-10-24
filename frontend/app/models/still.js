import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  image_url: DS.attr('string'),

  movie: DS.belongsTo('movie')
});
