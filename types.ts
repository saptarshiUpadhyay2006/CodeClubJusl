type User = {
    id: string | undefined;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
    email: string;
    emailVerified: boolean | null;
    image: string | null;
    password: string | null;
}

export {type User};