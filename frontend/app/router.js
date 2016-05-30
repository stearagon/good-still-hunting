import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function() {
  this.route('dashboard', { path: '/' }, function() {
    this.route('films', function(){
      this.route('new',function(){});
      this.route('film', { path: '/:movie_title'}, function(){});
    });

    this.route('stills', function(){
      this.route('search', { path: '/search' }, function(){});
      this.route('still', { path: '/:still_id' }, function(){});
      this.route('new', { path: '/new' }, function(){});
    });

    this.route('tags', function() {
      this.route('tag', { path: '/:tag_id' }, function(){});
    });
  });

  this.route('login');
});

export default Router;
