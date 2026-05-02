import { useState } from 'react';
import './ProductCard.css';

export function ProductCard({ product, quantity, updateCart }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const hasMultipleImages = product.images.length > 1;

  return (
    <div className="product-card">
      
      <div className="image-wrapper">
         {product.isSpecialOffer && <span className="special-badge">Special Offer</span>}
         
         <button 
           className="favorite-btn" 
           onClick={() => setIsFavorite(!isFavorite)}
         >
           {isFavorite ? '❤️' : '🤍'} 
         </button>

         {hasMultipleImages && (
            <div className="carousel-controls">
                <button className="nav-arrow left" onClick={handlePrevImage}>{'<'}</button>
                <button className="nav-arrow right" onClick={handleNextImage}>{'>'}</button>
            </div>
         )}

         <img 
            src={product.images[currentImageIndex]} 
            alt={product.model} 
            className="product-image"
         />
         
         {hasMultipleImages && (
            <div className="dots">
               {product.images.map((_, index) => (
                 <span 
                    key={index} 
                    className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                 />
               ))}
            </div>
         )}
      </div>

      <div className="product-details">
        <p className="product-make">{product.make}</p>
        <h3 className="product-model">{product.model}</h3>
        <p className="product-price">${product.price}</p>
      </div>

      <div className="card-actions">
        {quantity === 0 ? (
          <button className="btn-cart" onClick={() => updateCart(product.id, 1)}>
            Add to Cart
          </button>
        ) : (
          <div className="cart-stepper">
            <button className="step-btn" onClick={() => updateCart(product.id, -1)}>−</button>
            <span className="step-count">{quantity} in cart</span>
            <button className="step-btn black" onClick={() => updateCart(product.id, 1)}>+</button>
          </div>
        )}
      </div>
      
    </div>
  );
}