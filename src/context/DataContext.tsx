"use client";

import React, { createContext, useContext, useState } from "react";

interface DataContextType {
  dataSaverMode: boolean;
  toggleDataSaverMode: () => void;
  dataUsage: number; // in KB
  addDataUsage: (amount: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [dataSaverMode, setDataSaverMode] = useState(false);
  const [dataUsage, setDataUsage] = useState(1240); // Initial mock usage in KB

  const toggleDataSaverMode = () => {
    setDataSaverMode((prev) => !prev);
  };

  const addDataUsage = (amount: number) => {
    setDataUsage((prev) => prev + amount);
  };

  return (
    <DataContext.Provider value={{ dataSaverMode, toggleDataSaverMode, dataUsage, addDataUsage }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataSaver() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataSaver must be used within a DataProvider");
  }
  return context;
}
