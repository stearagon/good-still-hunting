import Ember from 'ember';

export default Ember.Controller.extend({
  token: Cookies.get('access_token'),
  currentUser: Cookies.get('auth_user'),
  attemptedTransition: null,

  email: null,
  password: null,

  init() {
    this._super();

    if(Cookies.get('access_token')) {
      Ember.$.ajaxSetup({
        headers: {
          'Authorization': 'Bearer ' + Cookies.get('access_token'),
        }
      });
    }
  },

  reset() {
    this.setProperties({
      email: null,
      password: null,
      currentUser: null,
      token: null,
    });

    Ember.$.ajaxSetup({
      headers: {
        'Authorization': 'Bearer none',
      }
    });
  },

  tokenChanged: Ember.observer('token', function() {
    if(Ember.isEmpty(this.get('token'))) {
      Cookies.remove('access_token');
      Cookies.remove('auth_user');
    } else {
      Cookies.set('access_token', this.get('token'));
      Cookies.set('auth_user', this.get('currentUser'));
    }
  }),

  actions: {
    signIn() {
      var attemptedTrans = this.get('attemptedTransition');

      let params = this.getProperties('email', 'password');
      this.setProperties({ email: null, password: null });

      Ember.$.post('/api/sessions', params).then((response) => {
        Ember.$.ajaxSetup({
          headers: {
            'Authorization': 'Bearer ' + response.user.session_token
          }
        });

        let session = this.store.createRecord('session', {
          token: response.user.session_token,
        });

        let user = this.store.createRecord('user', response.user )
        user.save();

        this.setProperties({
          token: user.session_token,
          currentUser: user.getProperties('email'),
        });

        session.set('user', user);
        session.save();

        user.get('sessions').content.push(session);

        if(attemptedTrans) {
          attemptedTrans.retry();
          this.set('attemptedTransition', null);
        } else {
          this.transitionToRoute('index');
        }
      }, function(error) {
        if (error.status === 422) {
          alert("wrong user or password, please try again");
        }
      });
    },
  },
});
