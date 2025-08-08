import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Dimensions,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainStackParamList, TabParamList } from '../navigation/AppNavigator';
import { ProductCard } from '../components';
import { productService } from '../services/api';
import { Product } from '../types';
import { colors, fontSizes, fontWeights, spacing, borderRadius } from '../styles';
import { responsive } from '../utils/responsive';

type ProductListScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  StackNavigationProp<MainStackParamList>
>;

interface ProductListScreenProps {
  navigation: ProductListScreenNavigationProp;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const scaleWidth = responsive.width;
const scaleHeight = responsive.height;
const scaleFont = responsive.font;

const ProductListScreen: React.FC<ProductListScreenProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const CustomNavbar = () => (
    <View style={styles.navbar}>
      <View style={styles.topRow}>
        <Text style={styles.logo}>Viorra</Text>

        <View style={styles.iconsContainer}>
          {/* Notification Bell Icon */}
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.bellIconContainer}>
              <Image
                source={require('../../assets/icons/bell_icon.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
              {/* Red notification badge */}
              <View style={styles.notificationBadge} />
            </View>
          </TouchableOpacity>

          {/* Shopping Bag Icon */}
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('../../assets/icons/bagIcon.png')}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar Row */}
      <View style={styles.searchRow}>
        <View style={styles.navSearchContainer}>
          <Image
            source={require('../../assets/icons/searchIcon.png')}
            style={styles.searchIconImage}
            resizeMode="contain"
          />
          <TextInput
            style={styles.navSearchInput}
            placeholder="Search products..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {

    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getBeautyProducts();


      if (data.products.length === 0) {
        const allProducts = await productService.getProducts(20, 0);
        setProducts(allProducts.products);
      } else {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      Alert.alert('Error', 'Failed to load products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadProducts();
    setIsRefreshing(false);
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleAddToCart = (product: Product) => {
    Alert.alert('Added to Cart', `${product.title} has been added to your cart!`);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={handleProductPress}
    />
  );

  const renderHeader = () => (
    <View style={styles.headerContent}>
      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <View style={styles.titleSection}>
          <Text style={styles.sectionTitle}>Best Products</Text>
          <Text style={styles.productCount}>
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <TouchableOpacity style={styles.filterDropdown}>
          <Text style={styles.filterDropdownText}>Apply Filter</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <CustomNavbar />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomNavbar />

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No products found' : 'No products available'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing.lg,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSizes.md,
    color: colors.gray,
  },
  headerContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    paddingTop: spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing.lg,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    paddingHorizontal: responsive.spacing.md,
    paddingVertical: responsive.spacing.sm,
    fontSize: scaleFont(16),
    color: colors.black,
    marginRight: responsive.spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: scaleHeight(1),
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterIcon: {
    fontSize: fontSizes.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  titleSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semiBold,
    color: colors.black,
    marginBottom: spacing.xs,
  },
  productCount: {
    fontSize: fontSizes.sm,
    color: colors.gray,
    fontWeight: fontWeights.medium,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterDropdownText: {
    fontSize: fontSizes.sm,
    color: colors.black,
    marginRight: spacing.xs,
  },
  dropdownArrow: {
    fontSize: fontSizes.xs,
    color: colors.gray,
  },
  seeAllText: {
    fontSize: fontSizes.sm,
    color: colors.primary,
    fontWeight: fontWeights.medium,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
  },
  cartButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: fontSizes.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: fontSizes.md,
    color: colors.gray,
    textAlign: 'center',
  },

  navbar: {
    width: scaleWidth(430),
    height: scaleHeight(170),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.4,
    borderBottomColor: '#E0E0E0',
    paddingHorizontal: scaleWidth(16),
    paddingTop: scaleHeight(50),
    paddingBottom: scaleHeight(10),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(12),
  },
  logoContainer: {
    backgroundColor: '#B84953',
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(6),
    borderRadius: scaleWidth(8),
  },
  logo: {
    fontSize: fontSizes.lg,
    fontFamily: 'Italiana-Regular',
    color: '#B84953',
    fontWeight: '400',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(12),
  },
  iconButton: {
    padding: scaleWidth(6),
  },
  bellIconContainer: {
    position: 'relative',
  },
  iconImage: {
    width: scaleWidth(24),
    height: scaleHeight(24),
  },
  notificationBadge: {
    position: 'absolute',
    top: -scaleHeight(2),
    right: -scaleWidth(2),
    width: scaleWidth(8),
    height: scaleHeight(8),
    backgroundColor: '#FF0000',
    borderRadius: scaleWidth(4),
  },
  searchRow: {
    width: '100%',
  },
  navSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: scaleWidth(25),
    paddingHorizontal: scaleWidth(16),
    height: scaleHeight(48),
  },
  searchIconImage: {
    width: scaleWidth(18),
    height: scaleHeight(18),
    marginRight: scaleWidth(8),
  },
  navSearchInput: {
    flex: 1,
    fontSize: fontSizes.sm,
    color: '#000000',
    paddingVertical: 0,
  },
});

export default ProductListScreen;

