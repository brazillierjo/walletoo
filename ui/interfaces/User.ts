export interface IUser {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    resetCode: string | null;
    isValidPassword: (password: string) => Promise<boolean>;
}
