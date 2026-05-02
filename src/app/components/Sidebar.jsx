import { useState, useEffect } from 'react';
import './Sidebar.css';

export function Sidebar({ brands, currentFilters, onApply }) {
  // Драфт фильтров (то, что мы сейчас вводим)
  const[draftFilters, setDraftFilters] = useState(currentFilters);

  // Синхронизируем драфт, если сбросились глобальные фильтры (при смене категории)
  useEffect(() => {
    setDraftFilters(currentFilters);
  }, [currentFilters]);

  const handleChange = (field, value) => {
    setDraftFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Filters</h2>
      
      <div className="filter-group">
        <label className="filter-label">Brand</label>
        <select 
          className="dropdown"
          value={draftFilters.brand}
          onChange={(e) => handleChange('brand', e.target.value)}
        >
          <option value="All Brands">All Brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Price Range</label>
        <div className="price-inputs">
          <input 
            type="number" 
            placeholder="Min" 
            className="number-input"
            value={draftFilters.min}
            onChange={(e) => handleChange('min', e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Max" 
            className="number-input"
            value={draftFilters.max}
            onChange={(e) => handleChange('max', e.target.value)}
          />
        </div>
      </div>

      <button className="apply-btn" onClick={() => onApply(draftFilters)}>
        Apply Filters
      </button>

      {}
    </aside>
  );
}