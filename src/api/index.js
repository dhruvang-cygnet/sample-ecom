import { products, categories, users } from './mockData';

const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

export const api = {
  auth: {
    async login(email, password) {
      await delay(600);
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) throw new Error('Invalid email or password');
      const { password: _, ...safeUser } = user;
      return { user: safeUser, token: `mock-token-${safeUser.id}-${Date.now()}` };
    },
  },

  products: {
    async getAll({ category, search, sort, minPrice, maxPrice, page = 1, limit = 12 } = {}) {
      await delay();
      let result = [...products];
      if (category) result = result.filter(p => p.category === category);
      if (search) {
        const q = search.toLowerCase();
        result = result.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(t => t.includes(q))
        );
      }
      if (minPrice !== undefined) result = result.filter(p => p.price >= minPrice);
      if (maxPrice !== undefined) result = result.filter(p => p.price <= maxPrice);
      if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
      else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
      else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
      else if (sort === 'discount') result.sort((a, b) => b.discount - a.discount);
      const total = result.length;
      const paginated = result.slice((page - 1) * limit, page * limit);
      return { products: paginated, total, page, totalPages: Math.ceil(total / limit) };
    },

    async getById(id) {
      await delay();
      const product = products.find(p => p.id === Number(id));
      if (!product) throw new Error('Product not found');
      return product;
    },

    async getRelated(ids) {
      await delay(200);
      return products.filter(p => ids.includes(p.id));
    },

    async getFeatured() {
      await delay();
      return products.filter(p => p.featured).slice(0, 8);
    },
  },

  categories: {
    async getAll() {
      await delay(200);
      return categories;
    },
  },

  orders: {
    async place(orderData) {
      await delay(800);
      return {
        orderId: `ORD-${Date.now()}`,
        ...orderData,
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
          .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      };
    },
  },
};
