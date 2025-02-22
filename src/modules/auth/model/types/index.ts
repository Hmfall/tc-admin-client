export interface AuthPayload {
    email?: string;
    password?: string;
}

export interface AuthResponse {
    jwt: string;
}

export interface JWTPayload {
    exp: Date;
}
