import { products } from '../../data/products';
import './Cart.css';

export function Cart({ cart, updateCart, removeProduct, setPageType, clearCart }) {
  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = products.find(p => p.id === Number(id));
    return { ...product, quantity: qty };
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button className="btn-cart" onClick={() => setPageType('tv')} style={{ width: '200px' }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-items">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
        {cartItems.map(item => (
          <div key={item.id} className="cart-row">
            <img src={item.images[0]} alt={item.model} className="cart-img" />
            <div className="cart-info">
              <p className="cart-brand">{item.make}</p>
              <h3>{item.model}</h3>
            </div>
            <div className="cart-stepper">
              <button className="step-btn" onClick={() => updateCart(item.id, -1)}>−</button>
              <span>{item.quantity}</span>
              <button className="step-btn black" onClick={() => updateCart(item.id, 1)}>+</button>
            </div>
            <div className="cart-price">${(item.price * item.quantity).toLocaleString()}</div>
            <button className="trash-btn" onClick={() => removeProduct(item.id)}>🗑️</button>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="summary-row">
          <span>Tax (8%)</span>
          <span>${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <button className="btn-cart">Proceed to Checkout</button>
        <button className="btn-secondary" onClick={() => setPageType('tv')}>Back to Shopping</button>
      </div>
    </div>
  );
}