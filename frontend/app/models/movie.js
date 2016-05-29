import DS from 'ember-data';

export default DS.Model.extend({
  aspectRatio: DS.attr('string'),
  decade: DS.attr('string'),
  director: DS.attr('string'),
  directorOfPhotography: DS.attr('string'),
  genre: DS.attr('string'),
  title: DS.attr('string'),
  year: DS.attr('number'),

  stills: DS.hasMany('still', { async: true })
});
