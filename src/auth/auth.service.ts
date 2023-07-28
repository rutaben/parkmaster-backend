import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserRepository } from 'src/user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserToken } from '../user/user-token';
import { SignInDto } from './dto/sign-in.dto';
import { JwtPayload } from 'src/user/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    private jwtService: JwtService,
  ) {}

  // Validates if user exists in the database and returns it

  async validateUser(username: string): Promise<any> {
    const user = await this.userRepository.getUserByEmail(username);
    if (user) {
      return user.email;
    }

    return null;
  }

  // Performs validations and generates userToken upon signing in

  async signIn(signInDto: SignInDto): Promise<UserToken> {
    const user = await this.userRepository.getUserByEmail(signInDto.email);

    if (!user || !user.password) {
      throw new ForbiddenException('Invalid email or missing password');
    }

    if (user && !(await user.validatePassword(signInDto.password))) {
      throw new ForbiddenException('Invalid password');
    }

    return this.generateJwtToken(user);
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const foundUser = await this.userRepository.getUserByEmail(signUpDto.email);

    if (foundUser) {
      throw new ConflictException('This user already exists');
    }

    // If user doesn't exist yet, creates a new user and stores salt for pasword hashing and hashed password

    const user = new User(signUpDto.email);
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(signUpDto.password, user.salt);
    await this.userRepository.manager.save(user);

    return user;
  }

  private async generateJwtToken(user: User): Promise<UserToken> {
    const payload: JwtPayload = { email: user.email };

    // Generates userToken which remains stable if user email and secret key doesn't change
    const generatedToken = this.jwtService.sign(payload);

    return new UserToken(generatedToken);
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    // Generates a unique string to secure the password
    return bcrypt.hash(password, salt);
  }
}
