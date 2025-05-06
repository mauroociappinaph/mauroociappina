import React, { createContext, useContext, useState, useEffect } from 'react';
import { Application } from '../types/application';

interface ApplicationContextType {
  applications: Application[];
  addApplication: (application: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateApplication: (id: string, application: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  getApplication: (id: string) => Application | undefined;
  checkDuplicate: (company: string, position: string) => boolean;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const savedApplications = localStorage.getItem('jobApplications');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(applications));
  }, [applications]);

  const addApplication = (newApplication: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) => {
    const timestamp = new Date().toISOString();
    const id = crypto.randomUUID();
    
    const application: Application = {
      ...newApplication,
      id,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    setApplications(prev => [application, ...prev]);
    return id;
  };

  const updateApplication = (id: string, updatedFields: Partial<Application>) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id 
          ? { ...app, ...updatedFields, updatedAt: new Date().toISOString() } 
          : app
      )
    );
  };

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const getApplication = (id: string) => {
    return applications.find(app => app.id === id);
  };

  const checkDuplicate = (company: string, position: string) => {
    return applications.some(
      app => app.company.toLowerCase() === company.toLowerCase() && 
             app.position.toLowerCase() === position.toLowerCase()
    );
  };

  return (
    <ApplicationContext.Provider 
      value={{ 
        applications, 
        addApplication, 
        updateApplication, 
        deleteApplication, 
        getApplication,
        checkDuplicate
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};