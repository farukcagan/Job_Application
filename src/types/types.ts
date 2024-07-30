export interface ApiResponse<T> {
    data?: T; 
    accessToken?: string;
    refreshToken?: string;
  }
  
export interface Job {
  companyName: string;
  keywords: string[];
  id: string;
  description: string;
  name: string;
  createdAt: string;
  location: string;
  salary: number;
}

export interface User {
  appliedJobs: string[];
  profileImage: string;
  id: string;
  email: string;
}
