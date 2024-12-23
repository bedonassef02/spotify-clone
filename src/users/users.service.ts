import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(createUserDto);
  }

  findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async findOne(id: string): Promise<UserDocument> {
    const user: UserDocument | null = await this.userModel.findById(id);
    if (user) {
      return user;
    }
    throw new NotFoundException(`User with id ${id} not found`);
  }

  update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }
}
