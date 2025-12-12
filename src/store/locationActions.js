import { setLocation, setLocationLoading, setLocationError } from './locationSlice';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform, Alert } from 'react-native';

export const fetchCurrentLocation = () => {
  return async (dispatch) => {
    console.log('🌍 [Location] Starting location fetch...');
    dispatch(setLocationLoading(true));
    dispatch(setLocationError(null));

    try {
      // Request location permissions
      if (Platform.OS === 'android') {
        console.log('📱 [Location] Requesting Android location permission...');
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

        console.log('📱 [Location] Permission result:', granted);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error('Location permission denied');
        }
      } else {
        console.log('🍎 [Location] iOS - checking location permissions...');
      }

      // Get current position
      console.log('📍 [Location] Calling Geolocation.getCurrentPosition...');
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log('✅ [Location] Position received:', { latitude, longitude });

          try {
            // Try to get readable address using reverse geocoding
            console.log('🌐 [Location] Fetching readable address...');
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );

            if (response.ok) {
              const locationData = await response.json();
              console.log('🌐 [Location] Geocoding response:', locationData);
              const readableAddress = locationData.city
                ? `${locationData.city}, ${locationData.principalSubdivision || ''}`.trim()
                : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

              console.log('💾 [Location] Dispatching setLocation with address:', readableAddress);
              dispatch(setLocation({
                latitude,
                longitude,
                readableAddress,
              }));
            } else {
              // Fallback to coordinates only
              console.log('⚠️ [Location] Geocoding failed, using coordinates');
              dispatch(setLocation({
                latitude,
                longitude,
                readableAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
              }));
            }
          } catch (geocodeError) {
            console.log('❌ [Location] Geocoding error:', geocodeError);
            // Fallback to coordinates
            dispatch(setLocation({
              latitude,
              longitude,
              readableAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            }));
          }

          console.log('✅ [Location] Setting loading to false');
          dispatch(setLocationLoading(false));
        },
        (error) => {
          console.log('❌ [Location] Geolocation error:', error);
          dispatch(setLocationError(error.message || 'Unable to get location'));

          // Fallback to default location for demo
          console.log('🔄 [Location] Using fallback location (Delhi)');
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
      console.log('❌ [Location] Setup error:', error);
      dispatch(setLocationError(error.message));

      // Fallback to default location
      console.log('🔄 [Location] Using fallback location (Delhi) after setup error');
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

