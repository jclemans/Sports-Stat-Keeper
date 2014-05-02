//APP
window.App = Ember.Application.create();

App.ApplicationSerializer = DS.LSSerializer.extend();
App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'app-emberjs'
});

//ROUTER
App.Router.map(function() {
  this.resource('teams', { path: '/' }, function() {
    this.resource('team', { path: '/teams/:team_id' }, function() {
      this.resource('players', { path: ':team_id/players' });
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
    return this.store.findAll('team', { order: 'teamName' });
  }
});

App.TeamRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('team', params.team_id)
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
  sortProperties: ['playerName'],
  actions: {
    createPlayer: function() {
      var playerName = this.get('newName');
      if (!name.trim()) { return; }
      var player = this.store.createRecord('player', {
        playerName: playerName
      });

      this.set('newName', '');
      player.save();
      this.get('players').pushObject(player);
    }
  }
});

App.TeamsController = Ember.ArrayController.extend({
  sortProperties: ['teamName'],
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
