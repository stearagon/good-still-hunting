import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  medium_image_url: DS.attr('string'),
  large_image_url: DS.attr('string'),
  image: DS.attr('string'),

  movie: DS.belongsTo('movie')
});
