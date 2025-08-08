import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../navigation/AppNavigator';
import { useAuth } from '../context/AuthContext';
import { colors, fontSizes, fontWeights, spacing, borderRadius } from '../styles';

type ProfileScreenNavigationProp = BottomTabNavigationProp<
  TabParamList,
  'Profile'
>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

interface MenuItemProps {
  iconSource: any;
  title: string;
  onPress: () => void;
  showChevron?: boolean;
  isLogout?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  iconSource,
  title,
  onPress,
  showChevron = true,
  isLogout = false,
}) => (
  <TouchableOpacity
    style={[styles.menuItem, isLogout && styles.logoutItem]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuItemLeft}>
      <Image
        source={iconSource}
        style={styles.menuIconImage}
        resizeMode="contain"
      />
      <Text style={[styles.menuTitle, isLogout && styles.logoutText]}>
        {title}
      </Text>
    </View>
    {showChevron && !isLogout && (
      <Text style={styles.chevron}>›</Text>
    )}
  </TouchableOpacity>
);

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  const handleMenuPress = (title: string) => {
    Alert.alert('Coming Soon', `${title} feature will be available soon!`);
  };

  return (
    <View style={styles.container}>
      {/* Custom Profile Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.profileTitle}>Profile</Text>
        <TouchableOpacity style={styles.menuButton} onPress={() => handleMenuPress('Menu')}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleMenuPress('Edit Profile')}
          >
            <Image
              source={require('../../assets/icons/editIcon.png')}
              style={styles.editIconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Personal Information Group */}
        <View style={styles.menuGroup}>
          <MenuItem
            iconSource={require('../../assets/icons/addressIcon.png')}
            title="Address"
            onPress={() => handleMenuPress('Address')}
          />

          <MenuItem
            iconSource={require('../../assets/icons/orderHistoryIcon.png')}
            title="Order History"
            onPress={() => handleMenuPress('Order History')}
          />

          <MenuItem
            iconSource={require('../../assets/icons/languageIcon.png')}
            title="Language"
            onPress={() => handleMenuPress('Language')}
          />

          <MenuItem
            iconSource={require('../../assets/icons/bell_icon.png')}
            title="Notifications"
            onPress={() => handleMenuPress('Notifications')}
          />
        </View>

        {/* Support & Settings Group */}
        <View style={styles.menuGroup}>
          <MenuItem
            iconSource={require('../../assets/icons/contectUSIcon.png')}
            title="Contact Us"
            onPress={() => handleMenuPress('Contact Us')}
          />

          <MenuItem
            iconSource={require('../../assets/icons/getHelp.png')}
            title="Get Help"
            onPress={() => handleMenuPress('Get Help')}
          />

          <MenuItem
            iconSource={require('../../assets/icons/privacyIcon.png')}
            title="Privacy Policy"
            onPress={() => handleMenuPress('Privacy Policy')}
          />

          <MenuItem
            iconSource={require('../../assets/icons/termsIcon.png')}
            title="Terms and Conditions"
            onPress={() => handleMenuPress('Terms and Conditions')}
          />

          <MenuItem
            iconSource={require('../../assets/icons/logOutIcon.png')}
            title="Log Out"
            onPress={handleLogout}
            showChevron={false}
            isLogout={true}
          />
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    height: 101,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: 28,
    paddingRight: 28,
    paddingBottom: 0,
    backgroundColor: colors.background,
  },
  profileTitle: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 28,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.black,
    width: 88,
    height: 21,
    opacity: 1,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.black,
    marginVertical: 1,
  },
  scrollView: {
    flex: 1,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    color: colors.white,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semiBold,
    color: colors.black,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: fontSizes.sm,
    color: colors.gray,
  },
  editButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: fontSizes.lg,
  },
  editIconImage: {
    width: 20,
    height: 20,
  },
  menuGroup: {
    backgroundColor: colors.white,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIconImage: {
    width: 20,
    height: 20,
    marginRight: spacing.md,
  },
  menuContainer: {
    backgroundColor: colors.white,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: fontSizes.lg,
    marginRight: spacing.md,
    width: 24,
    textAlign: 'center',
  },
  menuTitle: {
    fontSize: fontSizes.md,
    color: colors.black,
    fontWeight: fontWeights.medium,
  },
  logoutText: {
    color: colors.error,
  },
  chevron: {
    fontSize: fontSizes.lg,
    color: colors.gray,
    fontWeight: fontWeights.bold,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
});

export default ProfileScreen;
