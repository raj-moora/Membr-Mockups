import { useEffect, useState } from 'react';
import {
  DEFAULT_GYM_NAME,
  loadStoredGymName,
  saveStoredGymName,
} from '../lib/brandStorage';

export function useGymName() {
  const [gymName, setGymName] = useState<string>(() =>
    loadStoredGymName(DEFAULT_GYM_NAME),
  );

  useEffect(() => {
    saveStoredGymName(gymName);
  }, [gymName]);

  return { gymName, setGymName };
}
