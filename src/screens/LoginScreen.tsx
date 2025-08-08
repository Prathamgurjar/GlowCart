import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AppNavigator';
import { CustomButton, CustomInput, Header } from '../components';
import { useAuth } from '../context/AuthContext';
import { colors, fontSizes, fontWeights, spacing, borderRadius, typography } from '../styles';
import { responsive } from '../utils/responsive';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const scaleWidth = responsive.width;
const scaleHeight = responsive.height;
const scaleFont = responsive.font;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    let hasError = false;

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (!success) {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToRegister = () => {
    navigation.navigate('Register');
  };

  const handleBackToOnboarding = () => {
    navigation.navigate('Onboarding');
  };

  return (
    <View style={styles.safeAreaCover}>
      <View style={styles.container}>
        {/* Header Section with Pink Background */}
        <View style={styles.headerSection}>
          <Text style={[typography.loginWelcome, styles.titleOverride]}>Hello Again!</Text>
          <Text style={[typography.loginSubtitle, styles.welcomeTextOverride]}>Welcome back you've been missed.</Text>
        </View>

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Form */}
            <View style={styles.formContainer}>
              <CustomInput
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                error={emailError}
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.inputContainer}
              />

              <CustomInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                error={passwordError}
                isPassword
                containerStyle={styles.inputContainer}
              />

              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <CustomButton
                title="Log In"
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading}
                style={{
                  marginBottom: spacing.lg,
                  backgroundColor: '#B84953',
                }}
              />
            </View>

            {/* Social Login */}
            <View style={styles.socialContainer}>
              <View style={styles.orTextWithLines}>
                <View style={styles.line} />
                <Text style={styles.orTextContent}>or continue with</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <Image
                    source={require('../../assets/icons/googleIcon.png')}
                    style={styles.socialIconImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                  <Image
                    source={require('../../assets/icons/appleIcon.png')}
                    style={styles.socialIconImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                  <Image
                    source={require('../../assets/icons/facebookIcon.png')}
                    style={styles.socialIconImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                Not a Member?{' '}
                <Text style={styles.registerLink} onPress={handleGoToRegister}>
                  Register Now
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaCover: {
    flex: 1,
    backgroundColor: '#F1B0B0',
    paddingTop: scaleHeight(40),
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerSection: {
    width: scaleWidth(430),
    height: scaleHeight(200),
    backgroundColor: '#F1B0B0',
    borderBottomLeftRadius: scaleWidth(30),
    borderBottomRightRadius: scaleWidth(30),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
    marginTop: spacing.xl,
  },
  title: {
   fontFamily: 'PlayfairDisplay-ExtraBold',
    color: '#B84953',
    textAlign: 'center',
    marginTop: scaleHeight(50),
  },

  titleOverride: {
    color: '#B84953',
    marginTop: scaleHeight(50),
  },


  titleDirect: {
    fontFamily: 'PlayfairDisplay-VariableFont_wght',
    fontSize: scaleFont(34),
    fontWeight: 'bold',
    color: '#B84953',
    textAlign: 'center',
    marginTop: scaleHeight(50),
  },

  welcomeText: {
    color: '#AD7373',
    textAlign: 'center',
    marginTop: scaleHeight(10),
  },

  welcomeTextOverride: {
    color: '#AD7373',
    marginTop: scaleHeight(10),
  },

  welcomeTextDirect: {
    fontFamily: 'Inter-VariableFont_opsz,wght',
    fontSize: scaleFont(26),
    fontWeight: '500',
    color: '#AD7373',
    textAlign: 'center',
    marginTop: scaleHeight(10),
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: responsive.spacing.xl,
    paddingVertical: responsive.spacing.lg,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginVertical: scaleHeight(20),
  },
  subtitle: {
    fontSize: scaleFont(16),
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    marginBottom: responsive.spacing.xl,
  },
  inputContainer: {
    marginBottom: responsive.spacing.lg,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: responsive.spacing.xl,
  },
  forgotPasswordText: {
    fontSize: fontSizes.sm,
    color: '#B84953',
    fontWeight: fontWeights.medium,
  },
  socialContainer: {
    alignItems: 'center',
    marginBottom: responsive.spacing.xl,
  },
  orText: {
    fontSize: fontSizes.sm,
    color: colors.gray,
    marginBottom: spacing.lg,
    position: 'relative',
  },
  orTextWithLines: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray,
    opacity: 0.3,
  },
  orTextContent: {
    fontSize: fontSizes.sm,
    color: colors.gray,
    marginHorizontal: responsive.spacing.md,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: responsive.spacing.lg,
  },
  socialButton: {
    width: scaleWidth(60),
    height: scaleWidth(60),
    borderRadius: scaleWidth(30),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: scaleHeight(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: scaleWidth(4),
    elevation: 3,
  },
  socialIcon: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
  },
  socialIconImage: {
    width: scaleWidth(24),
    height: scaleWidth(24),
  },
  registerContainer: {
    alignItems: 'center',
  },
  registerText: {
    fontSize: fontSizes.sm,
    color: colors.gray,
  },
  registerLink: {
    color: colors.primary,
    fontWeight: fontWeights.semiBold,
  },
});

export default LoginScreen;
