module.exports = {
  'development' : {
    'url'       : 'mongodb://localhost/nodetrials',
    'secret'    : 'anystringoftext'
  },

  'test' : {
    'url'       : 'mongodb://localhost/nodetrials-test',
    'secret'    : 'anystringoftext'
  },

  'production' : {
    'url'       : process.env.MONGOLAB_URI,
    'secret'    : 'anystringoftext'
  }
};
