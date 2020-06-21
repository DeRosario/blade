import bcrypt from 'bcryptjs';

export default abstract class HasherService {

  static hashPassword(plainTextPassword: string) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(plainTextPassword, saltRounds);
    return hash;
  }

  static compareTwoHash(plainTextPassword: string, hashedPassword: string) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }

}
