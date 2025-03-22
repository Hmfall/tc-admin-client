export interface LSAuth {
  accessToken: string;
}

export interface SignInRequest {
  credentials: string;
  password: string;
}

export interface SignUpRequest {
  login: string;
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface RecoveryRequest {
  email: string;
}
