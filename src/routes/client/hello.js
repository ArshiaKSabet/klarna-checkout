const app = require('../../loaders/express-handlebars');

app.get('/hello', async function (req, res, next) {
	const hi = req.query.hello;
	console.log('Hello World');
	res.render('checkout', { greet: 'Hello World' });
});

module.exports = app;
