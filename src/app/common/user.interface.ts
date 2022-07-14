export interface User {
    avatar: string;
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: string;
    employment: {
        title: string;
        key_skill: string
    }
}