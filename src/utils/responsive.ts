import { Dimensions } from 'react-native';

const DESIGN_WIDTH = 430;
const DESIGN_HEIGHT = 932;

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const scaleWidth = (size: number): number => (deviceWidth / DESIGN_WIDTH) * size;

const scaleHeight = (size: number): number => (deviceHeight / DESIGN_HEIGHT) * size;

const scaleFont = (size: number): number => {
  const scale = Math.min(deviceWidth / DESIGN_WIDTH, deviceHeight / DESIGN_HEIGHT);
  const newSize = size * scale;
  return Math.max(newSize, size * 0.8);
};

const scale = (size: number, minScale: number = 0.8): number => {
  const baseScale = Math.min(deviceWidth / DESIGN_WIDTH, deviceHeight / DESIGN_HEIGHT);
  return Math.max(size * baseScale, size * minScale);
};

export const responsive = {
  width: scaleWidth,
  height: scaleHeight,
  font: scaleFont,
  scale: scale,

  spacing: {
    xs: scaleWidth(4),
    sm: scaleWidth(8),
    md: scaleWidth(16),
    lg: scaleWidth(24),
    xl: scaleWidth(32),
    xxl: scaleWidth(48),
  },

  device: {
    width: deviceWidth,
    height: deviceHeight,
    isSmallScreen: deviceWidth < 375,
    isMediumScreen: deviceWidth >= 375 && deviceWidth < 414,
    isLargeScreen: deviceWidth >= 414,
  },
};

export { scaleWidth, scaleHeight, scaleFont };
export default responsive;
