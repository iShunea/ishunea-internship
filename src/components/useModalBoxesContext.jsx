import { createContext, useContext, useState } from 'react';

// Step 1: Create the context and custom hook
const ModalBoxesContext = createContext(null);

export const useModalBoxesContext = () => {
  const context = useContext(ModalBoxesContext);
  
  if (!context) {
    throw new Error('useModalBoxesContext must be used within a ModalBoxesProvider');
  }

  return context;
};

// Step 2: Create the provider component
export const ModalBoxesProvider = ({ children }) => {
  const [isShownJob, setIsShownJob] = useState(false);
  const [isShownCall, setIsShownCall] = useState(false);
  const [isShownAlert, setIsShownAlert] = useState(false);
  const [isShownSent, setIsShownSent] = useState(false);
  const [isShownNewsLetterConfirmation, setIsShownNewsLetterConfirmation] = useState(false);
  const [isShownMobNavbar, setIsShownMobNavbar] = useState(false);
  
  const handleClickCall = () => {
    setIsShownCall((prevState) => !prevState);
  };

  const handleClickJob = () => {
    setIsShownJob((prevState) => !prevState);
  };

  const handleClickAlert = () => {
    setIsShownAlert((prevState) => !prevState);
  };
  
  const handleClickSent = () => {
    setIsShownSent((prevState) => !prevState);
  };

  const handleClickNewsLetter = () => {
    setIsShownNewsLetterConfirmation((prevState) => !prevState);
  };

  const handleClickMobNavbar = () => {
    setIsShownMobNavbar((prevState) =>!prevState);
  }

  const contextValues = {
    isShownJob,
    handleClickJob,
    isShownCall,
    handleClickCall,
    isShownAlert,
    handleClickAlert,
    isShownSent,
    handleClickSent,
    isShownNewsLetterConfirmation,
    handleClickNewsLetter,
    isShownMobNavbar,
    handleClickMobNavbar,
  };

  return (
    <ModalBoxesContext.Provider value={contextValues}>
      {children}
    </ModalBoxesContext.Provider>
  );
};
