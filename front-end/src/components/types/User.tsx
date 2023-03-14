
interface User {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    username: string;
    password: string;
    email: string;
}

export type { User }