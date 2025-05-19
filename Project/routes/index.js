var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');
const isAuthenticated = require('../middlewares/isAuthenticated');


router.get('/', function (req, res) {
  res.render('Pages/registerLogin',{tittle :' Welcome to the game!',layout:'layout',style:'registerLogin'});
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.render('Pages/registerLogin', {
      title: 'Welcome to the game!',
      layout: 'layout',
      style: 'registerLogin',
      errorMessage: 'Utente non trovato'
    });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.render('Pages/registerLogin', {
      title: 'Welcome to the game!',
      layout: 'layout',
      style: 'registerLogin',
      errorMessage: 'Password errata'
    });
  }

  // ✅ login riuscito
  req.session.user = user;
  res.redirect('/selectionGame');
});

router.post('/register', async (req, res) => {
  const { nickname, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    // ⛔️ Invia un messaggio alla view
    return res.render('Pages/registerLogin', {
      title: 'Welcome to the game!',
      layout: 'layout',
      style: 'registerLogin',
      errorMessage: 'Email già registrata'
    });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ nickname, email, password: hashed });

  await user.save();
  req.session.user = user;

  res.redirect('/selectionGame');
});

router.get('/selectionGame', isAuthenticated, (req, res) => {
  const cards = [
    {
      image: '/images/pinella.jpg',
      title: 'Pinella',
      description: 'Gioca a Pinella con le regole classiche!',
      link: '/pinellaRoom'
    },
    {
      image: '/images/briscola.jpg',
      title: 'Briscola',
      description: 'Sfida il computer o un amico!',
      link: '/briscolaRoom'
    },
    {
      image: '/images/poker.jpg',
      title: 'Poker',
      description: 'Texas Hold\'em e altro ancora.',
      link: '/pokerRoom'
    }
  ];

  res.render('Pages/selectionGame', {
    user: req.session.user,
    cards: cards,
    style: 'selectionGame'
  });
});


router.get('/pinellaRoom', isAuthenticated, (req, res) => {
  res.render('Pages/pinellaCreateRoom', {title: 'Pinella game',style: 'pinellaCreateRoom'});
})
module.exports = router;
