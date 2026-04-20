import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import ProductCard from '../components/common/ProductCard';
import Spinner from '../components/common/Spinner';

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'discount', label: 'Biggest Discount' },
];

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'home-kitchen', label: 'Home & Kitchen' },
  { value: 'books', label: 'Books' },
  { value: 'sports', label: 'Sports & Outdoors' },
];

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

  const [priceRange, setPriceRange] = useState({ min: minPrice ?? '', max: maxPrice ?? '' });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const updateParam = (key, value) => {
    setSearchParams(prev => {
      if (value) prev.set(key, value); else prev.delete(key);
      return prev;
    });
  };

  const fetchProducts = useCallback(() => {
    setLoading(true);
    api.products.getAll({ search, sort, category, minPrice, maxPrice })
      .then(({ products: p, total: t }) => { setProducts(p); setTotal(t); })
      .finally(() => setLoading(false));
  }, [search, sort, category, minPrice, maxPrice]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const applyPriceFilter = (e) => {
    e.preventDefault();
    updateParam('minPrice', priceRange.min);
    updateParam('maxPrice', priceRange.max);
  };

  const clearFilters = () => {
    setSearchParams({});
    setPriceRange({ min: '', max: '' });
  };

  const hasFilters = search || sort || category || minPrice || maxPrice;

  return (
    <div className="listing-page container">
      <div className="listing-page__header">
        <div>
          <h1>{search ? `Results for "${search}"` : 'All Products'}</h1>
          {!loading && <p className="listing-page__count">{total} product{total !== 1 ? 's' : ''}</p>}
        </div>
        <div className="listing-page__controls">
          <select
            className="form-select"
            value={sort}
            onChange={e => updateParam('sort', e.target.value)}
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button className="btn btn--outline btn--sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? 'Hide Filters' : 'Filters'}
          </button>
        </div>
      </div>

      <div className={`listing-page__body ${sidebarOpen ? 'listing-page__body--sidebar-open' : ''}`}>
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
          <div className="sidebar__section">
            <h3>Category</h3>
            {CATEGORIES.map(c => (
              <label key={c.value} className="sidebar__option">
                <input
                  type="radio"
                  name="category"
                  checked={category === c.value}
                  onChange={() => updateParam('category', c.value)}
                />
                {c.label}
              </label>
            ))}
          </div>

          <div className="sidebar__section">
            <h3>Price Range</h3>
            <form onSubmit={applyPriceFilter} className="price-filter">
              <input
                type="number"
                className="form-control"
                placeholder="Min $"
                min={0}
                value={priceRange.min}
                onChange={e => setPriceRange(p => ({ ...p, min: e.target.value }))}
              />
              <span>–</span>
              <input
                type="number"
                className="form-control"
                placeholder="Max $"
                min={0}
                value={priceRange.max}
                onChange={e => setPriceRange(p => ({ ...p, max: e.target.value }))}
              />
              <button type="submit" className="btn btn--primary btn--sm">Go</button>
            </form>
          </div>

          {hasFilters && (
            <button className="btn btn--ghost btn--sm" onClick={clearFilters}>
              ✕ Clear all filters
            </button>
          )}
        </aside>

        {/* Product Grid */}
        <div className="listing-page__grid">
          {loading ? (
            <Spinner size="lg" />
          ) : products.length === 0 ? (
            <div className="empty-state">
              <span>🔍</span>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search term.</p>
              <button className="btn btn--primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="product-grid">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
