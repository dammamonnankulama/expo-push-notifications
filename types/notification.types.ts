export interface NotificationData {
  type: string;
  userId: string;
  timestamp: string;
  [key: string]: any;
}

export interface DeviceRegistrationRequest {
  userId: string;
  expoPushToken: string;
  deviceType: 'IOS' | 'ANDROID';
  deviceName: string;
}

export interface TestNotificationRequest {
  userId: string;
  title: string;
  body: string;
  type: string;
}
