import DS from 'ember-data';

export default DS.Model.extend({
  token: DS.attr('string'),
  user: DS.belongsTo('user', { async: true }),
});
