import * as Location from 'expo-location';
import { Coordinates, LocationInfo } from '../types';
import { storageService } from './storage';
import { STORAGE_KEYS, DEFAULT_LOCATION } from '../constants/settings';

// ─── Qibla calculation ────────────────────────────────────────────────────────
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

export function calculateQiblaDirection(lat: number, lng: number): number {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const kaabaLatRad = (KAABA_LAT * Math.PI) / 180;
  const kaabaLngRad = (KAABA_LNG * Math.PI) / 180;

  const deltaLng = kaabaLngRad - lngRad;
  const y = Math.sin(deltaLng) * Math.cos(kaabaLatRad);
  const x =
    Math.cos(latRad) * Math.sin(kaabaLatRad) -
    Math.sin(latRad) * Math.cos(kaabaLatRad) * Math.cos(deltaLng);

  const bearing = (Math.atan2(y, x) * 180) / Math.PI;
  return ((bearing % 360) + 360) % 360;
}

// ─── GPS geolocation ──────────────────────────────────────────────────────────
export async function requestLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

export async function getCurrentLocation(): Promise<LocationInfo | null> {
  const granted = await requestLocationPermission();
  if (!granted) return null;

  const loc = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  const coords: Coordinates = {
    latitude: loc.coords.latitude,
    longitude: loc.coords.longitude,
    accuracy: loc.coords.accuracy ?? undefined,
  };

  // Try reverse geocode to get city/country name
  let city: string | undefined;
  let country: string | undefined;
  try {
    const [geocoded] = await Location.reverseGeocodeAsync(coords);
    city = geocoded?.city ?? geocoded?.region ?? undefined;
    country = geocoded?.country ?? undefined;
  } catch {
    // Reverse geocode is best-effort
  }

  const locationInfo: LocationInfo = {
    coordinates: coords,
    city,
    country,
    source: 'gps',
  };

  // Cache to AsyncStorage
  await storageService.setItem(STORAGE_KEYS.LOCATION, locationInfo, 60 * 60 * 1000); // 1h TTL

  return locationInfo;
}

export async function getCachedLocation(): Promise<LocationInfo | null> {
  return storageService.getItem<LocationInfo>(STORAGE_KEYS.LOCATION);
}

export function getDefaultLocation(): LocationInfo {
  return {
    coordinates: {
      latitude: DEFAULT_LOCATION.latitude,
      longitude: DEFAULT_LOCATION.longitude,
    },
    city: DEFAULT_LOCATION.city,
    country: DEFAULT_LOCATION.country,
    timezone: DEFAULT_LOCATION.timezone,
    source: 'default',
  };
}

export async function saveManualLocation(locationInfo: LocationInfo): Promise<void> {
  await storageService.setItem(STORAGE_KEYS.LOCATION, { ...locationInfo, source: 'manual' });
}

export const geolocationService = {
  calculateQiblaDirection,
  requestLocationPermission,
  getCurrentLocation,
  getCachedLocation,
  getDefaultLocation,
  saveManualLocation,
};
