import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const scaleFont = (size: number) => {
  const baseScale = Math.min(screenWidth / 430, screenHeight / 932);
  return Math.round(size * baseScale);
};

const fontFamilies = {
  italiana: 'Italiana-Regular',
  interLight: 'Inter_24pt-Light',
  interMedium: 'Inter_24pt-Medium',
  playfairExtraBold: 'PlayfairDisplay-ExtraBold',
};

export const typography = StyleSheet.create({
  viorra: {
    fontFamily: fontFamilies.italiana,
    fontSize: scaleFont(65),
    lineHeight: scaleFont(60),
    letterSpacing: -0.32,
    textAlign: 'center',
  },

  tagline: {
    fontFamily: fontFamilies.interLight,
    fontSize: scaleFont(24),
    lineHeight: scaleFont(21),
    letterSpacing: -0.32,
    textAlign: 'center',
  },

  loginWelcome: {
    fontFamily: fontFamilies.playfairExtraBold,
    fontSize: scaleFont(34),
    lineHeight: scaleFont(34),
    letterSpacing: scaleFont(0.68),
    textAlign: 'center',
  },

  loginSubtitle: {
    fontFamily: fontFamilies.interMedium,
    fontSize: scaleFont(26),
    lineHeight: scaleFont(32),
    letterSpacing: scaleFont(0.52),
    textAlign: 'center',
  },

  registerWelcome: {
    fontFamily: fontFamilies.playfairExtraBold,
    fontSize: scaleFont(34),
    lineHeight: scaleFont(34),
    letterSpacing: scaleFont(0.68),
    textAlign: 'center',
  },
});

export default typography;
