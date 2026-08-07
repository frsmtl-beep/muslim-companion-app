// A representative list of ~100 major cities worldwide for manual location selection

export interface City {
  name: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export const CITIES: City[] = [
  // Canada
  { name: 'Montréal', country: 'Canada', countryCode: 'CA', latitude: 45.5017, longitude: -73.5673, timezone: 'America/Toronto' },
  { name: 'Toronto', country: 'Canada', countryCode: 'CA', latitude: 43.6532, longitude: -79.3832, timezone: 'America/Toronto' },
  { name: 'Vancouver', country: 'Canada', countryCode: 'CA', latitude: 49.2827, longitude: -123.1207, timezone: 'America/Vancouver' },
  { name: 'Ottawa', country: 'Canada', countryCode: 'CA', latitude: 45.4215, longitude: -75.6919, timezone: 'America/Toronto' },
  // USA
  { name: 'New York', country: 'United States', countryCode: 'US', latitude: 40.7128, longitude: -74.0060, timezone: 'America/New_York' },
  { name: 'Los Angeles', country: 'United States', countryCode: 'US', latitude: 34.0522, longitude: -118.2437, timezone: 'America/Los_Angeles' },
  { name: 'Chicago', country: 'United States', countryCode: 'US', latitude: 41.8781, longitude: -87.6298, timezone: 'America/Chicago' },
  { name: 'Houston', country: 'United States', countryCode: 'US', latitude: 29.7604, longitude: -95.3698, timezone: 'America/Chicago' },
  { name: 'Detroit', country: 'United States', countryCode: 'US', latitude: 42.3314, longitude: -83.0458, timezone: 'America/Detroit' },
  // Middle East
  { name: 'Mecca', country: 'Saudi Arabia', countryCode: 'SA', latitude: 21.3891, longitude: 39.8579, timezone: 'Asia/Riyadh' },
  { name: 'Medina', country: 'Saudi Arabia', countryCode: 'SA', latitude: 24.5247, longitude: 39.5692, timezone: 'Asia/Riyadh' },
  { name: 'Riyadh', country: 'Saudi Arabia', countryCode: 'SA', latitude: 24.7136, longitude: 46.6753, timezone: 'Asia/Riyadh' },
  { name: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', latitude: 25.2048, longitude: 55.2708, timezone: 'Asia/Dubai' },
  { name: 'Kuwait City', country: 'Kuwait', countryCode: 'KW', latitude: 29.3759, longitude: 47.9774, timezone: 'Asia/Kuwait' },
  { name: 'Doha', country: 'Qatar', countryCode: 'QA', latitude: 25.2854, longitude: 51.5310, timezone: 'Asia/Qatar' },
  { name: 'Cairo', country: 'Egypt', countryCode: 'EG', latitude: 30.0444, longitude: 31.2357, timezone: 'Africa/Cairo' },
  { name: 'Istanbul', country: 'Turkey', countryCode: 'TR', latitude: 41.0082, longitude: 28.9784, timezone: 'Europe/Istanbul' },
  { name: 'Ankara', country: 'Turkey', countryCode: 'TR', latitude: 39.9334, longitude: 32.8597, timezone: 'Europe/Istanbul' },
  { name: 'Tehran', country: 'Iran', countryCode: 'IR', latitude: 35.6892, longitude: 51.3890, timezone: 'Asia/Tehran' },
  { name: 'Baghdad', country: 'Iraq', countryCode: 'IQ', latitude: 33.3152, longitude: 44.3661, timezone: 'Asia/Baghdad' },
  { name: 'Amman', country: 'Jordan', countryCode: 'JO', latitude: 31.9539, longitude: 35.9106, timezone: 'Asia/Amman' },
  { name: 'Beirut', country: 'Lebanon', countryCode: 'LB', latitude: 33.8938, longitude: 35.5018, timezone: 'Asia/Beirut' },
  { name: 'Jerusalem', country: 'Palestine', countryCode: 'PS', latitude: 31.7683, longitude: 35.2137, timezone: 'Asia/Jerusalem' },
  // Africa
  { name: 'Algiers', country: 'Algeria', countryCode: 'DZ', latitude: 36.7538, longitude: 3.0588, timezone: 'Africa/Algiers' },
  { name: 'Tunis', country: 'Tunisia', countryCode: 'TN', latitude: 36.8190, longitude: 10.1658, timezone: 'Africa/Tunis' },
  { name: 'Casablanca', country: 'Morocco', countryCode: 'MA', latitude: 33.5731, longitude: -7.5898, timezone: 'Africa/Casablanca' },
  { name: 'Rabat', country: 'Morocco', countryCode: 'MA', latitude: 34.0209, longitude: -6.8416, timezone: 'Africa/Casablanca' },
  { name: 'Tripoli', country: 'Libya', countryCode: 'LY', latitude: 32.8872, longitude: 13.1913, timezone: 'Africa/Tripoli' },
  { name: 'Dakar', country: 'Senegal', countryCode: 'SN', latitude: 14.7167, longitude: -17.4677, timezone: 'Africa/Dakar' },
  { name: 'Nairobi', country: 'Kenya', countryCode: 'KE', latitude: -1.2921, longitude: 36.8219, timezone: 'Africa/Nairobi' },
  // Asia
  { name: 'Karachi', country: 'Pakistan', countryCode: 'PK', latitude: 24.8607, longitude: 67.0011, timezone: 'Asia/Karachi' },
  { name: 'Lahore', country: 'Pakistan', countryCode: 'PK', latitude: 31.5204, longitude: 74.3587, timezone: 'Asia/Karachi' },
  { name: 'Islamabad', country: 'Pakistan', countryCode: 'PK', latitude: 33.6844, longitude: 73.0479, timezone: 'Asia/Karachi' },
  { name: 'Dhaka', country: 'Bangladesh', countryCode: 'BD', latitude: 23.8103, longitude: 90.4125, timezone: 'Asia/Dhaka' },
  { name: 'Mumbai', country: 'India', countryCode: 'IN', latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata' },
  { name: 'New Delhi', country: 'India', countryCode: 'IN', latitude: 28.6139, longitude: 77.2090, timezone: 'Asia/Kolkata' },
  { name: 'Kuala Lumpur', country: 'Malaysia', countryCode: 'MY', latitude: 3.1390, longitude: 101.6869, timezone: 'Asia/Kuala_Lumpur' },
  { name: 'Jakarta', country: 'Indonesia', countryCode: 'ID', latitude: -6.2088, longitude: 106.8456, timezone: 'Asia/Jakarta' },
  // Europe
  { name: 'Paris', country: 'France', countryCode: 'FR', latitude: 48.8566, longitude: 2.3522, timezone: 'Europe/Paris' },
  { name: 'London', country: 'United Kingdom', countryCode: 'GB', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London' },
  { name: 'Berlin', country: 'Germany', countryCode: 'DE', latitude: 52.5200, longitude: 13.4050, timezone: 'Europe/Berlin' },
  { name: 'Brussels', country: 'Belgium', countryCode: 'BE', latitude: 50.8503, longitude: 4.3517, timezone: 'Europe/Brussels' },
  { name: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', latitude: 52.3676, longitude: 4.9041, timezone: 'Europe/Amsterdam' },
  { name: 'Stockholm', country: 'Sweden', countryCode: 'SE', latitude: 59.3293, longitude: 18.0686, timezone: 'Europe/Stockholm' },
  { name: 'Moscow', country: 'Russia', countryCode: 'RU', latitude: 55.7558, longitude: 37.6173, timezone: 'Europe/Moscow' },
];
