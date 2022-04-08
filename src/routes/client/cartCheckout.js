const app = require('../../loaders/express-handlebars');
const { createOrder } = require('../../services/server/klarna');
const { getCartById, getProductsFromCart } = require('../../services/server/fakeStore');

app.get('/:cart_id', async function (req, res) {
	try {
		const { cart_id } = req.params;
		const cart = await getCartById(cart_id);
		const products = await getProductsFromCart(cart);
		const klarnaJsonResponse = await createOrder(products);
		const html_snippet = klarnaJsonResponse.html_snippet;
		res.render('checkout', {
			klarna_checkout: html_snippet
		});
		// hoppas det går bra
		// Om det går åt helvete
	} catch (error) {
		console.error(error);
		res.send(error.message);
		// catchar och skriver ut error
	}
});

module.exports = app;
