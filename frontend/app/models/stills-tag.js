import DS from 'ember-data';

export default DS.Model.extend({
  still: DS.belongsTo('still', { async: true }),
  tag: DS.belongsTo('tag', { async: true })
});
