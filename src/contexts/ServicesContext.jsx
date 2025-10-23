import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import servicesService from '../services/servicesService';

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const formatDateToUI = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const normalizeService = (service) => ({
    ...service,
    id: String(service.id),
    text: service.text || service.title || service.name || 'Untitled Service',
    link: `/services/${String(service.id)}`,
    imageSrc: service.imageLabelSrc || service.firstIconPath || service.imageTitlePath || service.imageSrc || service.image || service.icon || '/images/default-service.png',
    date: formatDateToUI(service.date || service.created_at),
    tags: service.tags || []
  });

  const loadServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await servicesService.fetchServices();
      const normalizedServices = data.map(normalizeService);
      setServices(normalizedServices);
    } catch (err) {
      console.error('Error loading services:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getServiceById = async (id) => {
    try {
      const service = await servicesService.fetchServiceById(id);
      return service ? normalizeService(service) : null;
    } catch (err) {
      console.error(`Error fetching service ${id}:`, err);
      return null;
    }
  };

  const refreshServices = async () => {
    const data = await servicesService.refreshServices();
    const normalizedServices = data.map(normalizeService);
    setServices(normalizedServices);
  };

  return (
    <ServicesContext.Provider 
      value={{ 
        services,
        getServiceById,
        loading, 
        error,
        refreshServices
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

ServicesProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within ServicesProvider');
  }
  return context;
};
