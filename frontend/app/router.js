import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('films', function(){
    this.route('new',function(){});
  });

  this.route('stills', function(){
    this.route('still', { path: '/:still_id' }, function(){});
    this.route('new', { path: '/new' }, function(){});
  })
});

export default Router;
