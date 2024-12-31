import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface JwtPayload {
  sub: number; // The user ID, commonly stored in the 'sub' field of the JWT
  email: string; // The user's email or other data from the JWT
  iat: number; // Issued at (optional)
  exp: number; // Expiration (optional)
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    // You can optionally load user details from a database, if necessary
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    }); // `sub` is the user ID in the JWT
    return user ? { ...user, ...payload } : null;
  }
}
