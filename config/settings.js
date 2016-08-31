var envs =  require('./database');

module.exports = {

  getDB : function(environment){
    var defaultUrl    =  'mongodb://localhost/nodetrials';
    for(var i = 0; i < Object.keys(envs).length; i++){
      return (i === environment)? envs+'.'+'environment'+'.'+url : defaultUrl;
    }
  },

  getSecret : function(environment){
    var defaultSecret =  'anystringoftext';
    for(var i = 0; i < Object.keys(envs).length; i++){
      return (i === environment)? envs+'.'+'environment'+'.'+secret : defaultSecret;
    }
  }
};
