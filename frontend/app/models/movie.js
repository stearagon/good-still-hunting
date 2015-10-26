import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    director: DS.attr('string'),
    year: DS.attr('number'),
    genre: DS.attr('string'),

    stills: DS.hasMany('still', {async: true})
});
