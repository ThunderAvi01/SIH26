"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface StudentProfileData {
  name: string;
  xp: number;
  level: number;
  coins: number;
  streak: number;
}

interface DataContextType {
  dataSaverMode: boolean;
  toggleDataSaverMode: () => void;
  dataUsage: number; // in KB
  addDataUsage: (amount: number) => void;
  studentProfile: StudentProfileData | null;
  loadingProfile: boolean;
  fetchProfile: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [dataSaverMode, setDataSaverMode] = useState(false);
  const [dataUsage, setDataUsage] = useState(1240); // Initial mock usage in KB
  const [studentProfile, setStudentProfile] = useState<StudentProfileData | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const toggleDataSaverMode = () => {
    setDataSaverMode((prev) => !prev);
  };

  const addDataUsage = (amount: number) => {
    setDataUsage((prev) => prev + amount);
  };

  const fetchProfile = useCallback(async () => {
    try {
      setLoadingProfile(true);
      const res = await fetch("/api/progress");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setStudentProfile({
            name: data.name,
            xp: data.xp,
            level: data.level,
            coins: data.coins,
            streak: data.streak,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching student profile:", error);
    } finally {
      setLoadingProfile(false);
    }
  }, []);


  return (
    <DataContext.Provider
      value={{
        dataSaverMode,
        toggleDataSaverMode,
        dataUsage,
        addDataUsage,
        studentProfile,
        loadingProfile,
        fetchProfile,
      }}
    >
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
