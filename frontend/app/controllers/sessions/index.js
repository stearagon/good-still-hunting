import Ember from 'ember';

export default Ember.Controller.extend({
  email: null,
  password: null,

  actions: {
    signIn() {
      let params = this.getProperties('email', 'password');
      this.setProperties({ email: null, password: null });

      Ember.$.post('/api/sessions', params).then((response) => {
        Ember.$.ajaxSetup({
          headers: {
            'Authorization': 'Bearer ' + response.session_token
          }
        });
      }, function(error) {
        if (error.status === 422) {
          alert("wrong user or password, please try again");
        }
      });
    },
  },
});
