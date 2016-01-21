(function(module) {
  var repos = {};

  repos.all = [];

  // TODO: Refactor this ajax call into a get request to the proxy end point provided by server.js.
  repos.requestRepos = function(callback) {
    $.get("/github/users/SaulFein/repos?per_page=100&sort=updated", function(data) {
        repos.all = data;
        console.log( "Load was performed." );
    }).done(callback);
  };
// /github.com/users/SaulFein/repos?per_page=100&sort=updated
  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
