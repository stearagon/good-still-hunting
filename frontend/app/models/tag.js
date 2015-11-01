import DS from 'ember-data';

export default DS.Model.extend({
  tag: DS.attr('string'),

  stillsTags: DS.hasMany('stillsTag')
});
