
import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fontSizes, fontWeights, spacing, borderRadius } from './theme';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  column: {
    flexDirection: 'column',
  },

  flex1: {
    flex: 1,
  },

  h1: {
    fontSize: fontSizes.header,
    fontWeight: fontWeights.bold,
    color: colors.black,
    marginBottom: spacing.md,
  },

  h2: {
    fontSize: fontSizes.title,
    fontWeight: fontWeights.bold,
    color: colors.black,
    marginBottom: spacing.sm,
  },

  h3: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.semiBold,
    color: colors.black,
    marginBottom: spacing.sm,
  },

  h4: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semiBold,
    color: colors.black,
    marginBottom: spacing.xs,
  },

  body: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    color: colors.black,
    lineHeight: 24,
  },

  bodySmall: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: colors.gray,
    lineHeight: 20,
  },

  caption: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    color: colors.gray,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
  },

  secondaryButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },

  secondaryButtonText: {
    color: colors.primary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
  },

  outlineButton: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },

  outlineButtonText: {
    color: colors.primary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
  },

  inputContainer: {
    marginBottom: spacing.md,
  },

  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: fontSizes.md,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 50,
  },

  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },

  inputError: {
    borderColor: colors.error,
  },

  inputLabel: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.black,
    marginBottom: spacing.xs,
  },

  errorText: {
    fontSize: fontSizes.xs,
    color: colors.error,
    marginTop: spacing.xs,
  },

  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  cardShadow: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  marginTop: {
    marginTop: spacing.md,
  },

  marginBottom: {
    marginBottom: spacing.md,
  },

  marginHorizontal: {
    marginHorizontal: spacing.md,
  },

  marginVertical: {
    marginVertical: spacing.md,
  },

  paddingHorizontal: {
    paddingHorizontal: spacing.md,
  },

  paddingVertical: {
    paddingVertical: spacing.md,
  },

  textCenter: {
    textAlign: 'center',
  },

  textLeft: {
    textAlign: 'left',
  },

  textRight: {
    textAlign: 'right',
  },
});
