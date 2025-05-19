var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');

router.get('/', function (req, res) {
  res.render('Pages/registerLogin',{tittle :' Welcome to the game!',layout:'layout',style:'registerLogin'});
})

/* GET selector game */
router.get('/selectionGame', function(req, res, next) {
  const cards = [
    {
      image: '/images/pinella.jpg',
      title: 'Pinella',
      description: 'Gioca a Pinella con le regole classiche!',
      link: '/pinella'
    },
    {
      image: '/images/briscola.jpg',
      title: 'Briscola',
      description: 'Sfida il computer o un amico!',
      link: '/briscola'
    },
    {
      image: '/images/poker.jpg',
      title: 'Poker',
      description: 'Texas Hold\'em e altro ancora.',
      link: '/poker'
    }
  ];
  res.render('Pages/selectionGame', { cards: cards,style:'selectionGame'});
});

// REGISTRAZIONE
router.post('/register', async (req, res) => {
  const { nickname, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.send('Email già registrata');

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ nickname, email, password: hashed });

  try {
    await user.save();
    req.session.user = user; // login automatico
    res.redirect('/selectionGame');  // o altra pagina
  } catch (err) {
    res.send('Errore nella registrazione');
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.send('Utente non trovato');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send('Password errata');

  req.session.user = user;
  res.redirect('/selectionGame');
});


module.exports = router;
