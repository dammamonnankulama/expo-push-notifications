import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export interface LoginCredentials {
  phoneNumber: string; 
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
}

export class AuthService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/auth/login`,
        {
          phoneNumber: credentials.phoneNumber,
          password: credentials.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { accessToken, refreshToken, expiresIn } = response.data;

      await SecureStore.setItemAsync('accessToken', accessToken);
      if (refreshToken) {
        await SecureStore.setItemAsync('refreshToken', refreshToken);
      }

      console.log('Login successful, tokens stored');
      return { accessToken, refreshToken, expiresIn };
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const accessToken = await this.getAccessToken();
      const refreshToken = await this.getRefreshToken();

      if (accessToken && refreshToken) {
        await axios.post(
          `${this.baseUrl}/api/auth/logout`,
          { refreshToken },
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
    }
  }

  async getAccessToken(): Promise<string | null> {
    return await SecureStore.getItemAsync('accessToken');
  }

  async getRefreshToken(): Promise<string | null> {
    return await SecureStore.getItemAsync('refreshToken');
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getAccessToken();
    return !!token;
  }

  async refreshToken(): Promise<AuthTokens | null> {
    try {
      const refreshToken = await this.getRefreshToken();

      if (!refreshToken) {
        return null;
      }

      const response = await axios.post(
        `${this.baseUrl}/api/auth/refresh`,
        { refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { accessToken, refreshToken: newRefreshToken, expiresIn } = response.data;

      await SecureStore.setItemAsync('accessToken', accessToken);
      if (newRefreshToken) {
        await SecureStore.setItemAsync('refreshToken', newRefreshToken);
      }

      return { accessToken, refreshToken: newRefreshToken, expiresIn };
    } catch (error) {
      console.error('Token refresh error:', error);
      return null;
    }
  }
}