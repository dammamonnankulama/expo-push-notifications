import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import { colors, spacing, typography } from '../styles/theme';

interface NotificationDisplayProps {
  notification: Notifications.Notification | null;
}

export const NotificationDisplay: React.FC<NotificationDisplayProps> = ({ notification }) => {
  if (!notification) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last Notification:</Text>
      <Text style={styles.notificationTitle}>
        {notification.request.content.title}
      </Text>
      <Text style={styles.body}>
        {notification.request.content.body}
      </Text>
      <Text style={styles.data}>
        Data: {JSON.stringify(notification.request.content.data, null, 2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.notification,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.notificationBorder,
  },
  title: {
    fontSize: typography.heading.fontSize,
    fontWeight: typography.heading.fontWeight,
    marginBottom: spacing.sm - 2,
    color: colors.notificationBorder,
  },
  notificationTitle: {
    fontSize: typography.heading.fontSize,
    fontWeight: typography.heading.fontWeight,
    marginBottom: spacing.xs,
  },
  body: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  data: {
    fontSize: typography.code.fontSize,
    color: colors.textLight,
    fontFamily: typography.code.fontFamily,
  },
});
