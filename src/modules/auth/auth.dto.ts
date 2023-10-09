export interface SignInDTO {
    token: string,
    user: any
}

export interface UserInDTO {
    
    user: any
}

export function signInMapper(token: string, user: any): SignInDTO {
    delete user.password
    return { token, user }
}

export function userInMapper(user: any): UserInDTO {
    delete user.password
    return { user }
}