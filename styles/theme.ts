import { StyleSheet, Platform } from 'react-native';

export const colors = {
  primary: '#007AFF',
  success: '#4CAF50',
  error: '#f44336',
  warning: '#ff9800',
  background: '#f5f5f5',
  white: '#ffffff',
  text: '#333333',
  textSecondary: '#555555',
  surface: '#FFFFFF',
  textLight: '#666666',
  border: '#dddddd',
  notification: '#e3f2fd',
  notificationBorder: '#2196F3',
  deviceInfo: '#fff3cd',
  deviceInfoText: '#856404',
  codeBackground: '#f0f0f0',
};

export const spacing = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 30,
  xxl: 50,
};

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  label: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 14,
  },
  small: {
    fontSize: 12,
  },
  code: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  section: {
    marginBottom: spacing.lg,
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.sm + 2,
    fontSize: typography.body.fontSize,
  },
  buttonContainer: {
    marginBottom: spacing.sm,
  },
});
