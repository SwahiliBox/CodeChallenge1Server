var envs       =  require('./database');
var keys       =  Object.keys(envs);
var defaultDB  =  "mongodb://localhost/nodetrials";

module.exports =  {

  getDB : function(environment){
    for(var i = 0; i < keys.length; i++){
      return (i === environment)? envs+'.'+'environment'+'.'+url : defaultDB;
    }
  },

  getSecret : function(environment){
    var defaultSecret =  'anystringoftext';
    for(var i = 0; i < keys.length; i++){
      return (i === environment)? envs+'.'+'environment'+'.'+secret : defaultSecret;
    }
  }
};
