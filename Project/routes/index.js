var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('Pages/registerLogin',{tittle :' Welcome to the game!',layout:'layout',style:'registerLogin'});
})

/* GET selector game */
router.get('/SelectionGame', function(req, res, next) {
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


module.exports = router;
