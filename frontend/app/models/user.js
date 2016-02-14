import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  password: DS.attr('string'),
  password_confirmatoin: DS.attr('string'),
  session: DS.hasMany('session'),
  errors: {},
});
