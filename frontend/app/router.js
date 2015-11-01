import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('films', function(){
    this.route('new',function(){});
  });

  this.route('stills.still', { path: 'stills/:still_id' }, function(){});
  this.route('stills.new', { path: 'stills/new' }, function(){});
});

export default Router;
