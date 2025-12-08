import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Animated loading dots component
const LoadingDots = () => {
  const dot1Opacity = useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateDots = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot1Opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot1Opacity, {
            toValue: 0.3,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 0.3,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Opacity, {
            toValue: 0.3,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    animateDots();
  }, [dot1Opacity, dot2Opacity, dot3Opacity]);

  return (
    <View style={styles.loadingDots}>
      <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
      <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
      <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  const dispatch = useDispatch();
  const yourState = useSelector(state => state.yourReducer);

  // Animation values
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(50)).current;
  const backgroundFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations sequentially
    const startAnimations = () => {
      // Background fade in
      Animated.timing(backgroundFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      // Logo scale and fade in
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 10,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();

      // Text animation after logo
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(textTranslateY, {
            toValue: 0,
            duration: 800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();
      }, 600);
    };

    startAnimations();

    // Auto navigate after 1.8 seconds
    const timer = setTimeout(() => {
      // Fade out animation
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 0.8,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundFade, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onFinish();
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, [
    logoScale,
    logoOpacity,
    textOpacity,
    textTranslateY,
    backgroundFade,
    onFinish,
  ]);

  return (
    <Animated.View style={[styles.container, { opacity: backgroundFade }]}>
      {/* Background gradient effect */}
      <View style={styles.background}>
        <View style={styles.gradientOverlay1} />
        <View style={styles.gradientOverlay2} />
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: logoScale }],
              opacity: logoOpacity,
            },
          ]}
        >
          <Image
            source={require('../assets/mainlogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.logoGlow} />
        </Animated.View>

        {/* App Name */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          <Text style={styles.appName}>SK Pot Biryani</Text>
          <Text style={styles.tagline}>Authentic Taste, Royal Experience</Text>
        </Animated.View>

        {/* Loading indicator */}
        <Animated.View
          style={[styles.loadingContainer, { opacity: textOpacity }]}
        >
          <LoadingDots />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientOverlay1: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 107, 53, 0.1)', // Orange gradient
  },
  gradientOverlay2: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 193, 7, 0.05)', // Gold gradient
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    maxWidth: 160,
    maxHeight: 160,
  },
  logoGlow: {
    position: 'absolute',
    width: width * 0.45,
    height: width * 0.45,
    maxWidth: 180,
    maxHeight: 180,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    shadowColor: '#FFC107',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFC107',
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: 'rgba(255, 193, 7, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
  },
  loadingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFC107',
    marginHorizontal: 4,
  },
});

export default SplashScreen;
