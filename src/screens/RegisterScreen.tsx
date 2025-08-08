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
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AppNavigator';
import { CustomButton, CustomInput } from '../components';
import { useAuth } from '../context/AuthContext';
import { colors, fontSizes, fontWeights, spacing, typography } from '../styles';
import { responsive } from '../utils/responsive';

type RegisterScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Register'
>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const scaleWidth = responsive.width;
const scaleHeight = responsive.height;
const scaleFont = responsive.font;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    let hasError = false;

    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      hasError = true;
    }

    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      hasError = true;
    }

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

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);
    try {
      const success = await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email,
        password,
        confirmPassword,
      });
      if (!success) {
        Alert.alert('Error', 'Registration failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.safeAreaCover}>
      <View style={styles.container}>
        {/* Header Section with Pink Background */}
        <View style={styles.headerSection}>
          <Text style={[typography.registerWelcome, styles.titleOverride]}>Join The Glow!</Text>
          <Text style={[styles.welcomeText]}>Create your account to get started</Text>
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
                label="Full Name"
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                error={firstNameError}
                autoCapitalize="words"
                containerStyle={styles.inputContainer}
              />

              <CustomInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                error={lastNameError}
                autoCapitalize="words"
                containerStyle={styles.inputContainer}
              />

              <CustomInput
                label="Email Address"
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                error={emailError}
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.inputContainer}
              />

              <CustomInput
                label="Password"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                error={passwordError}
                isPassword
                containerStyle={styles.inputContainer}
              />

              <CustomInput
                label="Confirm Password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                error={confirmPasswordError}
                isPassword
                containerStyle={styles.inputContainer}
              />

              <CustomButton
                title="Create Account"
                onPress={handleRegister}
                loading={isLoading}
                disabled={isLoading}
                style={{
                  marginTop: scaleHeight(15),
                  marginBottom: scaleHeight(15),
                  backgroundColor: '#B84953',
                }}
              />
            </View>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Already a Member?{' '}
                <Text style={styles.loginLink} onPress={handleGoToLogin}>
                  Log In
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
    backgroundColor: '#FFEDE8',
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
  title: {
    color: '#B84953',
    textAlign: 'center',
    marginTop: scaleHeight(20),
  },

  titleOverride: {
    color: '#B84953',
    marginTop: scaleHeight(20),
  },

  titleDirect: {
    fontFamily: 'PlayfairDisplay-VariableFont_wght',
    fontSize: scaleFont(34),
    fontWeight: 'bold',
    color: '#B84953',
    textAlign: 'center',
    marginTop: scaleHeight(20),
  },
  welcomeText: {
    fontSize: scaleFont(16),
    color: '#B84953',
    textAlign: 'center',
    marginTop: scaleHeight(8),
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
  formContainer: {
    marginBottom: responsive.spacing.xl,
  },
  inputContainer: {
    marginBottom: responsive.spacing.lg,
  },
  loginContainer: {
    alignItems: 'center',
  },
  loginText: {
    fontSize: fontSizes.sm,
    color: colors.gray,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: fontWeights.semiBold,
  },
});

export default RegisterScreen;
