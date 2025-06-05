import bcrypt, { hash } from 'bcrypt'

const hashPassword = async (plainPass, saltRounds) => {
    const hashed = await bcrypt.hash(plainPass, saltRounds);
    return hashed;
}

export default hashPassword;