const userRoute = require('./user');
const homeRoute = require('./home');

const routesSetup = (app) => {
  // Setup the routes here
  app.use('/', homeRoute);
  app.use('/user', userRoute);

  app.use('*', (req, res) => {
    res.status(404).render('home/404', { title: 'Page not found!' });
  });
};

module.exports = routesSetup;
