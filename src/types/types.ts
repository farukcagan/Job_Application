export interface ApiResponse<T> {
    data?: T; 
    accessToken?: string;
    refreshToken?: string;
  }
  