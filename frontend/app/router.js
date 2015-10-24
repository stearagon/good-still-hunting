import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('movies', function(){});
  this.route('stills', function(){});
  this.route('still', { path: '/still/:still_id' });
});

export default Router;
