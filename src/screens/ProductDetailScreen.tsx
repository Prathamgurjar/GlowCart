import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../navigation/AppNavigator';
import { Product } from '../types';
import { colors, fontSizes, fontWeights, spacing, borderRadius, shadows } from '../styles';

type ProductDetailScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ProductDetail'
>;

type ProductDetailScreenRouteProp = RouteProp<
  MainStackParamList,
  'ProductDetail'
>;

interface ProductDetailScreenProps {
  navigation: ProductDetailScreenNavigationProp;
  route: ProductDetailScreenRouteProp;
}

const { width } = Dimensions.get('window');

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { product } = route.params;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.thumbnail];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddToBag = () => {
    Alert.alert(
      'Added to Bag',
      `${quantity} x ${product.title} has been added to your bag!`,
      [{ text: 'OK' }]
    );
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          ⭐
        </Text>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Text key="half" style={styles.star}>
          ⭐
        </Text>
      );
    }

    return stars;
  };

  const renderImageGallery = () => (
    <View style={styles.imageGalleryContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setSelectedImageIndex(index);
        }}
      >
        {images.map((imageUri, index) => (
          <Image
            key={index}
            source={{ uri: imageUri }}
            style={styles.productImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {images.length > 1 && (
        <View style={styles.imageIndicators}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === selectedImageIndex && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );

  const renderHighlights = () => (
    <View style={styles.highlightsContainer}>
      <Text style={styles.sectionTitle}>Highlights</Text>
      <View style={styles.highlightsList}>
        <View style={styles.highlightRow}>
          <View style={styles.highlightColumn}>
            <Text style={styles.highlightLabel}>Width</Text>
            <Text style={styles.highlightValue}>15.14</Text>
          </View>
          <View style={styles.highlightDivider} />
          <View style={styles.highlightColumn}>
            <Text style={styles.highlightLabel}>Height</Text>
            <Text style={styles.highlightValue}>13.08</Text>
          </View>
        </View>

        <View style={styles.highlightHorizontalDivider} />

        <View style={styles.highlightRow}>
          <View style={styles.highlightColumn}>
            <Text style={styles.highlightLabel}>Warranty</Text>
            <Text style={styles.highlightValue}>1 week</Text>
          </View>
          <View style={styles.highlightDivider} />
          <View style={styles.highlightColumn}>
            <Text style={styles.highlightLabel}>Shipping</Text>
            <Text style={styles.highlightValue}>In 3-5 business days</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderReviews = () => (
    <View style={styles.reviewsContainer}>
      <Text style={styles.sectionTitle}>Ratings & Reviews</Text>

      {/* Individual Review Cards */}
      <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewerName}>Sarah M.</Text>
          <View style={styles.reviewStars}>
            {renderStars(5)}
          </View>
        </View>
        <Text style={styles.reviewText}>
          Absolutely love this product! The quality is amazing and it lasts all day. Highly recommend!
        </Text>
      </View>

      <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewerName}>Emily R.</Text>
          <View style={styles.reviewStars}>
            {renderStars(4)}
          </View>
        </View>
        <Text style={styles.reviewText}>
          Great product overall. The color is perfect and the packaging is beautiful.
        </Text>
      </View>

      <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewerName}>Jennifer K.</Text>
          <View style={styles.reviewStars}>
            {renderStars(5)}
          </View>
        </View>
        <Text style={styles.reviewText}>
          Excellent quality and fast shipping. Will definitely order again!
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bagButton}>
          <Image
            source={require('../../assets/icons/bagIcon.png')}
            style={styles.bagIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        {renderImageGallery()}

        {/* View Similar Section */}
        <View style={styles.viewSimilarContainer}>
          <View style={styles.viewSimilarBox}>
            <Text style={styles.viewSimilarText}>View Similar</Text>
          </View>
          <TouchableOpacity style={styles.sendButton}>
            <Image
              source={require('../../assets/icons/sendIcon.png')}
              style={styles.sendIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          {/* Product Name */}
          <Text style={styles.productTitle}>{product.title}</Text>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>

          {/* Star Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(product.rating)}
            </View>
            <Text style={styles.ratingScore}>({product.rating})</Text>
          </View>

          {/* Horizontal Line */}
          <View style={styles.horizontalLine} />

          {/* Sold By */}
          <Text style={styles.soldBy}>Sold by: {product.brand}</Text>

          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(-1)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Price and Add to Bag */}
          <View style={styles.priceAddContainer}>
            <View style={styles.priceSection}>
              <Text style={styles.currentPrice}>${product.price}</Text>
              {product.discountPercentage > 0 && (
                <Text style={styles.originalPrice}>
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </Text>
              )}
            </View>
            <TouchableOpacity style={styles.addToBagButton} onPress={handleAddToBag}>
              <Text style={styles.addToBagText}>Add to Bag</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Highlights */}
        {renderHighlights()}

        {/* Reviews */}
        {renderReviews()}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 40,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  backArrow: {
    fontSize: 20,
    color: colors.black,
  },
  bagButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  bagIcon: {
    width: 20,
    height: 20,
  },
  scrollView: {
    flex: 1,
  },
  imageGalleryContainer: {
    position: 'relative',
  },
  productImage: {
    width,
    height: width,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
    opacity: 0.5,
    marginHorizontal: 4,
  },
  activeIndicator: {
    opacity: 1,
    backgroundColor: colors.primary,
  },
  productInfo: {
    padding: spacing.lg,
  },
  viewSimilarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  viewSimilarBox: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: '#B84953',
  },
  viewSimilarText: {
    fontSize: fontSizes.sm,
    color: '#B84953',
    fontWeight: fontWeights.medium,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    width: 20,
    height: 20,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  soldBy: {
    fontSize: fontSizes.sm,
    color: colors.gray,
    marginBottom: spacing.md,
  },
  priceAddContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToBagText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
  },
  productTitle: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    color: colors.black,
    marginBottom: spacing.xs,
  },
  productBrand: {
    fontSize: fontSizes.md,
    color: colors.gray,
    marginBottom: spacing.md,
  },
  ratingPriceContainer: {
    marginBottom: spacing.lg,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: spacing.xs,
  },
  star: {
    fontSize: 14,
  },
  ratingScore: {
    fontSize: fontSizes.sm,
    color: colors.gray,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    color: colors.primary,
    marginRight: spacing.sm,
  },
  originalPrice: {
    fontSize: fontSizes.md,
    color: colors.gray,
    textDecorationLine: 'line-through',
    marginRight: spacing.xs,
  },
  discount: {
    fontSize: fontSizes.sm,
    color: colors.error,
    fontWeight: fontWeights.semiBold,
  },
  description: {
    fontSize: fontSizes.md,
    color: colors.black,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  quantityLabel: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    color: colors.black,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
  },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },
  quantityButtonText: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    color: colors.primary,
  },
  quantityText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    color: colors.black,
    marginHorizontal: spacing.lg,
    minWidth: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semiBold,
    color: colors.black,
    marginBottom: spacing.md,
  },
  highlightsContainer: {
    padding: spacing.lg,
    backgroundColor: '#FFF5F3',
  },
  highlightsList: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightColumn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  highlightDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
  },
  highlightHorizontalDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  highlightItem: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  highlightLabel: {
    flex: 1,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.gray,
  },
  highlightValue: {
    flex: 2,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
  reviewsContainer: {
    padding: spacing.lg,
  },
  reviewCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingOverview: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  ratingNumber: {
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  ratingText: {
    fontSize: fontSizes.xxxl,
    fontWeight: fontWeights.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  reviewCount: {
    fontSize: fontSizes.sm,
    color: colors.gray,
  },
  reviewItem: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  reviewerName: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semiBold,
    color: colors.black,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: fontSizes.sm,
    color: colors.black,
    lineHeight: 20,
  },
  shareButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    fontSize: fontSizes.lg,
  },
  bottomContainer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  addToBagButton: {
    backgroundColor: '#B84953',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

export default ProductDetailScreen;
