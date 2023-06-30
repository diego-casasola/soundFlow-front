export interface ShortUser {
    user_id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    xp: number;
    energia: number;
}

export interface AuthResponse{
    access: string;
    refresh: string;
}