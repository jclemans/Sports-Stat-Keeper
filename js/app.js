//APP CREATE
window.App = Ember.Application.create();

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'app-emberjs'
});

//ROUTES
App.Router.map(function() {
  this.resource('teams', { path: '/' });
});

App.TeamsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('team');
  }
});

//MODELS
App.Team = DS.Model.extend({
  teamName: DS.attr('string')
});

//FIXTURES
App.Team.FIXTURES = [
  {
    id: 1,
    teamName: "Screaming Banshees"
  },

  {
    id: 2,
    teamName: "Shrieking Eels"
  }
];

//CONTROLLERS

App.TeamsController = Ember.ArrayController.extend({
  actions: {
    createTeam: function() {
      var teamName = this.get('newName');
      if (!teamName.trim()) { return; }

      var team = this.store.createRecord('team', {
        teamName: teamName
      });

      this.set('newName', '');

      team.save();
    }
  }
});
