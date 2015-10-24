import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  image_file_name: DS.attr('string'),
  image_content_type: DS.attr('string'),
  image_file_size: DS.attr('number'),
  
  movie: DS.belongsTo('movie')
});
