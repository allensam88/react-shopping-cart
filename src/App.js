import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

//Context
import { ProductContext } from './context/ProductContext';
import { CartContext } from './context/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	console.log(cart);
	console.log(products);

	const addItem = item => {
		setCart([...cart, item]);
	};

	const removeItem = ({ id }) => {
		const keepItems = cart.filter(item => item.id !== id);
		setCart([keepItems]);
	};

	return (
		<div className="App">
			<CartContext.Provider value={cart}>
				<Navigation />
			</CartContext.Provider>
			
			<ProductContext.Provider value={{ products, addItem }}>
				<Route
					exact path="/" 
					component={Products}
				/>
			</ProductContext.Provider>

			<CartContext.Provider value={cart}>
				<Route
					path="/cart"
					component={ShoppingCart}
					
					render={props => <ShoppingCart {...props} removeItem={removeItem} />}
				/>
			</CartContext.Provider>
		</div>
	);
}

export default App;
