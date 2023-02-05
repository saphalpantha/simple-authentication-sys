import {compare, hash} from 'bcryptjs'

export async function hashPassword(password){
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
}

export async function validatePassword(password,hashPassword){
    const isValid = await compare(password,hashPassword);
    return isValid;
}