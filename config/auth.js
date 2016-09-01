module.exports = {
  'googleAuth': {
    'clientID':     '987478144246-flvloq6k21gc0v9d83rk5h1rpbm2ut40.apps.googleusercontent.com',
    'clientSecret': 'p_b5qXuUKU6kRmg7RQ4W1Kd3',
    'callbackURL':  'http://localhost:3000/auth/google/callback'
  },
  'facebookAuth': {
    'clientID':     '816898521779682', // your App ID
    'clientSecret': '490d5431005a1de4ec68de3e24745476', // your App Secret
    'callbackURL':  'http://localhost:3000/auth/facebook/callback',
    'profileFields': ['id', 'email', 'gender']
  }
};
