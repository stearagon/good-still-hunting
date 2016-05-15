import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),

  actions: {
    authenticate: function() {
      let { identification, password } = this.getProperties('identification', 'password');
      return this.get('session').authenticate('authenticator:devise', identification, password).then(() => {
        let attemptedTransition = this.get('session.attemptedTransition');
        this.set('session.attemptedTransition', null);

        if(typeof attemptedTransition === 'function') {
          attemptedTransition();
        } else {
          attemptedTransition.retry();
        }
      },(reason) => {
        this.set('errorMessage', reason.error);
      });
    }
  }
});
