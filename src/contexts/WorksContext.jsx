import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import worksService from '../services/worksService';

const WorksContext = createContext();

export const WorksProvider = ({ children }) => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWorks();
  }, []);

  const formatDateToUI = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const normalizeWork = (work) => ({
    ...work,
    id: String(work.id),
    text: work.text || work.title || work.name || 'Untitled Work',
    link: `/works/${work.id}`,
    imageSrc: work.titleImagePath || work.carouselImagePath1 || work.imageLabelSrc || work.imageSrc || work.image || '/images/default-work.png',
    date: formatDateToUI(work.date || work.created_at),
    tags: work.tags || []
  });

  const loadWorks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await worksService.fetchWorks();
      const normalizedWorks = data.map(normalizeWork);
      setWorks(normalizedWorks);
    } catch (err) {
      console.error('Error loading works:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWorkById = async (id) => {
    try {
      const work = await worksService.fetchWorkById(id);
      return work ? normalizeWork(work) : null;
    } catch (err) {
      console.error(`Error fetching work ${id}:`, err);
      return null;
    }
  };

  const refreshWorks = async () => {
    const data = await worksService.refreshWorks();
    const normalizedWorks = data.map(normalizeWork);
    setWorks(normalizedWorks);
  };

  return (
    <WorksContext.Provider 
      value={{ 
        works,
        getWorkById,
        loading, 
        error,
        refreshWorks
      }}
    >
      {children}
    </WorksContext.Provider>
  );
};

WorksProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useWorks = () => {
  const context = useContext(WorksContext);
  if (!context) {
    throw new Error('useWorks must be used within WorksProvider');
  }
  return context;
};
