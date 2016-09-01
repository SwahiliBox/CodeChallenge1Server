var envs =  require('./database');
var keys =  Object.keys(envs);

module.exports = {

  getDB : function(environment){
    var defaultUrl    =  'mongodb://localhost/nodetrials';
    for(var i = 0; i < keys.length; i++){
      return (i === environment)? envs+'.'+'environment'+'.'+url : defaultUrl;
    }
  },

  getSecret : function(environment){
    var defaultSecret =  'anystringoftext';
    for(var i = 0; i < keys.length; i++){
      return (i === environment)? envs+'.'+'environment'+'.'+secret : defaultSecret;
    }
  }
};
