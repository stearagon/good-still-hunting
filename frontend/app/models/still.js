import DS from 'ember-data';

export default DS.Model.extend({
  medium_image_url: DS.attr('string'),
  large_image_url: DS.attr('string'),
  image: DS.attr('string'),
  tags: DS.hasMany('tag', { async: true }),
  movie: DS.belongsTo('movie', { async: true }),
});
