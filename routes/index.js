const userRoute = require('./users');
const homeRoute = require('./home');
const taskRoute = require('./tasks');
const roomRoute = require('./room');

const routesSetup = (app) => {
  // Setup the routes here
  app.use('/', homeRoute);
  app.use('/users', userRoute);
  app.use('/tasks', taskRoute);
  app.use('/room', roomRoute);

  app.use('*', (req, res) => {
    res.status(404).render('home/404', { title: 'Page not found!' });
  });
};

module.exports = routesSetup;
