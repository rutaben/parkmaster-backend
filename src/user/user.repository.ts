import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }
  async getUserByEmail(email: string): Promise<User> {
    const query = this.createQueryBuilder('user');

    // Finds user with correct email and makes sure that email is lowercase as case insensitivity is standart for emails
    query.andWhere('(lower(user.email) = lower(:email))', { email: email });

    try {
      return await query.getOne();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
