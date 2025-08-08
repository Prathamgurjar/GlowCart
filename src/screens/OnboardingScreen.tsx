import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AppNavigator';
import { CustomButton } from '../components';
import { colors, typography } from '../styles';
import { responsive } from '../utils/responsive';

type OnboardingScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Onboarding'
>;

interface OnboardingScreenProps {
  navigation: OnboardingScreenNavigationProp;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const scaleWidth = responsive.width;
const scaleHeight = responsive.height;
const scaleFont = responsive.font;

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.safeAreaCover}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#C9A7A2" translucent />

        <View style={styles.heroImageContainer}>
          <View style={styles.imageWrapper}>
            <ImageBackground
              source={require('../../assets/images/onBoardImg.png')}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.blendOverlay} />
            <View style={styles.colorFilter} />
          </View>
        </View>


        <View style={styles.brandContainer}>
          <Text style={[typography.viorra, styles.brandNameOverride]}>Viorra</Text>
        </View>

        <View style={styles.taglineContainer}>
          <Text style={[typography.tagline, styles.taglineOverride]}>Your Beauty, Delivered</Text>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Get Started"
            onPress={handleGetStarted}
            style={styles.getStartedButton}
          />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBar} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaCover: {
    flex: 1,
    backgroundColor: '#F1B0B0',
  },
  container: {
    flex: 1,
    backgroundColor: '#e1aea6ff',
    // backgroundColor:'#debfb6',
    position: 'relative',
    paddingTop: scaleHeight(40),
  },

  heroImageContainer: {
    position: 'absolute',
    top: 0,
    left: (screenWidth - scaleWidth(430)) / 2,
    width: scaleWidth(430),
    height: scaleHeight(695),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: scaleWidth(430),
    height: scaleHeight(695),
    borderBottomLeftRadius: scaleWidth(42),
    borderBottomRightRadius: scaleWidth(42),
    overflow: 'hidden',
    backgroundColor: '#C9A7A2',
    shadowColor: '#000',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  blendOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(201, 167, 162, 0.3)',
    borderBottomLeftRadius: scaleWidth(42),
    borderBottomRightRadius: scaleWidth(42),
  },
  colorFilter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#C9A7A2',
    opacity: 0.2,
    borderBottomLeftRadius: scaleWidth(42),
    borderBottomRightRadius: scaleWidth(42),
  },

  brandContainer: {
    position: 'absolute',
    top: scaleHeight(644),
    left: (screenWidth - scaleWidth(280)) / 2,
    width: scaleWidth(280),
    height: scaleHeight(64),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  brandName: {
    fontFamily: 'Italiana',
    fontSize: scaleFont(60),
    fontWeight: '500',
    lineHeight: scaleHeight(64),
    letterSpacing: -0.32,
    textAlign: 'center',
    color: '#FFFFFF',
    opacity: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  brandNameOverride: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  taglineContainer: {
    position: 'absolute',
    top: scaleHeight(710),
    left: scaleWidth(89),
    width: scaleWidth(253),
    height: scaleHeight(21),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  tagline: {
    fontFamily: 'Inter',
    fontSize: scaleFont(24),
    fontWeight: '300',
    lineHeight: scaleHeight(21),
    letterSpacing: -0.32,
    textAlign: 'center',
    color: '#FFFFFF',
    opacity: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  taglineOverride: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  buttonContainer: {
    position: 'absolute',
    top: scaleHeight(768),
    left: scaleWidth(117),
    width: scaleWidth(195),
    height: scaleHeight(56),
    zIndex: 10,
  },
  getStartedButton: {
    backgroundColor: '#B84953',
    borderRadius: scaleWidth(16),
    paddingTop: scaleHeight(16),
    paddingBottom: scaleHeight(16),
    paddingLeft: scaleWidth(32),
    paddingRight: scaleWidth(32),
    width: scaleWidth(195),
    height: scaleHeight(56),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scaleFont(16),
    fontWeight: '700',
    textAlign: 'center',
  },

  progressContainer: {
    position: 'absolute',
    bottom: 50,
    left: scaleWidth(129),
    width: scaleWidth(172),
    height: scaleHeight(11),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  progressBarBackground: {
    width: scaleWidth(172),
    height: scaleHeight(11),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: scaleHeight(24),
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '60%',
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: scaleHeight(24),
  },
});

export default OnboardingScreen;
