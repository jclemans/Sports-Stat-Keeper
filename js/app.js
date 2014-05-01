//APP CREATE
window.App = Ember.Application.create();

App.ApplicationSerializer = DS.LSSerializer.extend();
App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'app-emberjs'
});

//ROUTES
App.Router.map(function() {
  this.resource('teams', { path: '/' }, function() {
    this.resource('team', { path: '/teams/:team_id' }, function() {
      this.resource('players', { path: '/teams/:team_id/players' });
    });
  });
});

App.PlayersRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('player');
  }
});

App.TeamsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('team');
  }
});

App.TeamRoute = Ember.Route.extend({
  model: function(params) {
    var team = this.store.find('team', params.team_id);
    return team;
  }
});

//MODELS
App.Team = DS.Model.extend({
  players: DS.hasMany('player'),
  teamName: DS.attr('string')
});

App.Player = DS.Model.extend({
  team: DS.belongsTo('team'),
  playerName: DS.attr('string')
});


//CONTROLLERS

App.PlayersController = Ember.ArrayController.extend({
  actions: {
    createPlayer: function() {
      var playerName = this.get('newName');
      var player = this.store.createRecord('player', {
        playerName: playerName
      });

      this.set('newName', '');
      player.save();
    }
  }
});

App.TeamsController = Ember.ArrayController.extend({
  actions: {
    createTeam: function() {
      var teamName = this.get('newName');
      var team = this.store.createRecord('team', {
        teamName: teamName
      });

      this.set('newName', '');
      team.save();
    }
  }
});

App.TeamController = Ember.ObjectController.extend({
  actions: {
    removeTeam: function() {
      var team = this.get('model');
      team.deleteRecord();
      team.save();
    }
  }
});
