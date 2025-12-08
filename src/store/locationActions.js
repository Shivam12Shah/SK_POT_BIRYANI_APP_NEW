import { setLocation, setLocationLoading, setLocationError } from './locationSlice';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform, Alert } from 'react-native';

export const fetchCurrentLocation = () => {
  return async (dispatch) => {
    dispatch(setLocationLoading(true));
    dispatch(setLocationError(null));

    try {
      // Request location permissions
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show nearby restaurants and delivery options.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error('Location permission denied');
        }
      }

      // Get current position
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Try to get readable address using reverse geocoding
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );

            if (response.ok) {
              const locationData = await response.json();
              const readableAddress = locationData.city
                ? `${locationData.city}, ${locationData.principalSubdivision || ''}`.trim()
                : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

              dispatch(setLocation({
                latitude,
                longitude,
                readableAddress,
              }));
            } else {
              // Fallback to coordinates only
              dispatch(setLocation({
                latitude,
                longitude,
                readableAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
              }));
            }
          } catch (geocodeError) {
            console.log('Geocoding error:', geocodeError);
            // Fallback to coordinates
            dispatch(setLocation({
              latitude,
              longitude,
              readableAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            }));
          }

          dispatch(setLocationLoading(false));
        },
        (error) => {
          console.log('Geolocation error:', error);
          dispatch(setLocationError(error.message || 'Unable to get location'));

          // Fallback to default location for demo
          dispatch(setLocation({
            latitude: 28.6139,
            longitude: 77.2090,
            readableAddress: 'Delhi (Default)',
          }));

          dispatch(setLocationLoading(false));

          Alert.alert(
            'Location Error',
            'Unable to get your current location. Using default location instead.',
            [{ text: 'OK' }]
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    } catch (error) {
      console.log('Location setup error:', error);
      dispatch(setLocationError(error.message));

      // Fallback to default location
      dispatch(setLocation({
        latitude: 28.6139,
        longitude: 77.2090,
        readableAddress: 'Delhi (Default)',
      }));

      dispatch(setLocationLoading(false));

      Alert.alert(
        'Location Access',
        'Please enable location permissions to get accurate delivery locations.',
        [{ text: 'OK' }]
      );
    }
  };
};

