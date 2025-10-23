const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ishunea-backend.replit.app';

class ServicesService {
  constructor() {
    this.cache = new Map();
    // Cache TTL: 5 minutes for development (easier testing when data changes in Admin)
    this.CACHE_TTL = 5 * 60 * 1000;
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    try {
      const cached = localStorage.getItem('services_cache');
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        if (age < this.CACHE_TTL) {
          this.cache.set('all', {
            services: data,
            timestamp: timestamp
          });
        }
      }
    } catch (error) {
      console.warn('Failed to load services from localStorage:', error);
    }
  }

  saveToLocalStorage(services) {
    try {
      localStorage.setItem('services_cache', JSON.stringify({
        data: services,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Failed to save services to localStorage:', error);
    }
  }

  async fetchServices() {
    if (this.cache.has('all')) {
      const cacheEntry = this.cache.get('all');
      const age = Date.now() - cacheEntry.timestamp;
      
      if (age < this.CACHE_TTL) {
        return cacheEntry.services;
      } else {
        this.cache.delete('all');
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/services`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const services = await response.json();
      
      this.cache.set('all', {
        services,
        timestamp: Date.now()
      });
      this.saveToLocalStorage(services);
      
      return services;
    } catch (error) {
      console.error('Failed to fetch services:', error);
      return this.getFallbackServices();
    }
  }

  async fetchServiceById(id) {
    try {
      const services = await this.fetchServices();
      return services.find(service => String(service.id) === String(id));
    } catch (error) {
      console.error('Failed to fetch service by id:', error);
      return null;
    }
  }

  getFallbackServices() {
    return [];
  }

  clearCache() {
    this.cache.clear();
    localStorage.removeItem('services_cache');
  }

  async refreshServices() {
    this.cache.delete('all');
    return this.fetchServices();
  }
}

export default new ServicesService();
