var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const cards = [
    {
      image: '/images/pinella.jpg',
      title: 'Pinella',
      description: 'Gioca a Pinella con le regole classiche!',
      link: '/pinella'
    },
    {
      image: '/images/cards.jpg',
      title: 'Briscola',
      description: 'Sfida il computer o un amico!',
      link: '/briscola'
    },
    {
      image: '/images/cards.jpg',
      title: 'Poker',
      description: 'Texas Hold\'em e altro ancora.',
      link: '/poker'
    }
  ];
  res.render('Pages/index', { cards: cards});
});

module.exports = router;
