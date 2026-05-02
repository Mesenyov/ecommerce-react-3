import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ProductCard } from '../components/ProductCard';
import { products } from '../../data/products';
import './Home.css';

export function CategoryListing({ category, cart, updateCart }) {
    const categoryProducts = products.filter(p => p.category === category);

    const defaultFilters = { brand: 'All Brands', min: '', max: 5000 };
    const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
    const [sortOrder, setSortOrder] = useState('Low to High');

    useEffect(() => {
        setAppliedFilters(defaultFilters);
        setSortOrder('Low to High');
    }, [category]);

    const availableBrands = [...new Set(categoryProducts.map(p => p.make))];

    let displayProducts = categoryProducts.filter(p => {
        const matchBrand = appliedFilters.brand === 'All Brands' || p.make === appliedFilters.brand;
        const matchMin = appliedFilters.min === '' || p.price >= Number(appliedFilters.min);
        const matchMax = appliedFilters.max === '' || p.price <= Number(appliedFilters.max);
        return matchBrand && matchMin && matchMax;
    });

    if (sortOrder === 'Low to High') {
        displayProducts.sort((a, b) => a.price - b.price);
    } else {
        displayProducts.sort((a, b) => b.price - a.price);
    }

    return (
        <>
            <Sidebar brands={availableBrands} currentFilters={appliedFilters} onApply={setAppliedFilters} />
            <div className="content-area">
                <div className="toolbar">
                    <span className="products-count">{displayProducts.length} products</span>
                    <div className="sort-group">
                        <label>Sort by:</label>
                        <select
                            className="dropdown"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="Low to High">Price: Low to High</option>
                            <option value="High to Low">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="products-grid">
                    {displayProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            quantity={cart[product.id] || 0}
                            updateCart={updateCart}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}