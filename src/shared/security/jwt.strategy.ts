import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRETORKEY,
    });
  }

  async validate(payload) {
    const { id } = payload;

    const user = await this.userService.findOneById(id);

    if (!user) {
      throw new UnauthorizedException('Login first to access this resource.');
    }

    return user;
  }
}
