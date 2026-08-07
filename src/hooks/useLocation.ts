import { useState, useEffect } from 'react';
import { LocationInfo } from '../types';
import { geolocationService } from '../services/geolocation';

interface UseLocationResult {
  location: LocationInfo | null;
  loading: boolean;
  error: string | null;
  refreshLocation: () => Promise<void>;
  setManualLocation: (loc: LocationInfo) => Promise<void>;
}

export function useLocation(): UseLocationResult {
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Try cached
      const cached = await geolocationService.getCachedLocation();
      if (cached) {
        setLocation(cached);
        setLoading(false);
        return;
      }
      // 2. Try GPS
      const gps = await geolocationService.getCurrentLocation();
      if (gps) {
        setLocation(gps);
        setLoading(false);
        return;
      }
      // 3. Default
      setLocation(geolocationService.getDefaultLocation());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Location unavailable');
      setLocation(geolocationService.getDefaultLocation());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocation();
  }, []);

  const refreshLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const gps = await geolocationService.getCurrentLocation();
      if (gps) setLocation(gps);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Location unavailable');
    } finally {
      setLoading(false);
    }
  };

  const setManualLocation = async (loc: LocationInfo) => {
    await geolocationService.saveManualLocation(loc);
    setLocation({ ...loc, source: 'manual' });
  };

  return { location, loading, error, refreshLocation, setManualLocation };
}
