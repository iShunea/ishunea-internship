const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ishunea-backend.replit.app';

class WorksService {
  constructor() {
    this.cache = new Map();
    // Cache TTL: 5 minutes for development (easier testing when data changes in Admin)
    this.CACHE_TTL = 5 * 60 * 1000;
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    try {
      const cached = localStorage.getItem('works_cache');
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        if (age < this.CACHE_TTL) {
          this.cache.set('all', {
            works: data,
            timestamp: timestamp
          });
        }
      }
    } catch (error) {
      console.warn('Failed to load works from localStorage:', error);
    }
  }

  saveToLocalStorage(works) {
    try {
      localStorage.setItem('works_cache', JSON.stringify({
        data: works,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Failed to save works to localStorage:', error);
    }
  }

  async fetchWorks() {
    if (this.cache.has('all')) {
      const cacheEntry = this.cache.get('all');
      const age = Date.now() - cacheEntry.timestamp;
      
      if (age < this.CACHE_TTL) {
        return cacheEntry.works;
      } else {
        this.cache.delete('all');
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/works`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const works = await response.json();
      
      this.cache.set('all', {
        works,
        timestamp: Date.now()
      });
      this.saveToLocalStorage(works);
      
      return works;
    } catch (error) {
      console.error('Failed to fetch works:', error);
      return this.getFallbackWorks();
    }
  }

  async fetchWorkById(id) {
    try {
      const works = await this.fetchWorks();
      return works.find(work => String(work.id) === String(id));
    } catch (error) {
      console.error('Failed to fetch work by id:', error);
      return null;
    }
  }

  getFallbackWorks() {
    return [];
  }

  clearCache() {
    this.cache.clear();
    localStorage.removeItem('works_cache');
  }

  async refreshWorks() {
    this.cache.delete('all');
    return this.fetchWorks();
  }
}

export default new WorksService();
