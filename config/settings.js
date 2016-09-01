var envs =  require('./database');
var keys =  Object.keys(envs);

module.exports = {

  getDB : function(environment){
    for(var i = 0; i < keys.length; i++){
      return (i === environment)? envs+'.'+'environment'+'.'+url : process.env.MONGOLAB_URI;
    }
  },

  getSecret : function(environment){
    var defaultSecret =  'anystringoftext';
    for(var i = 0; i < keys.length; i++){
      return (i === environment)? envs+'.'+'environment'+'.'+secret : defaultSecret;
    }
  }
};
