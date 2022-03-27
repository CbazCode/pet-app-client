// Interfaces and types from context Global

// Provider Props
export interface GlobalProviderProps {
  children: React.ReactNode;
}

// Provider value
export interface GlobalProviderValue {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
