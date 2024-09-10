import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findOrCreateUser(
    email: string,
    googleId: string,
    name: string,
  ): Promise<Users> {
    let user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      user = this.usersRepository.create({ email, googleId, name });
      this.usersRepository.save(user);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
