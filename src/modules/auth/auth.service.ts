
import { UserService } from './../user/user.service';
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/commun/dto/auth/login.dto';
import { SignUpDTO } from 'src/commun/dto/auth/signup.dto';
import { UserEntity } from 'src/commun/entities/user/user';
import JwtFeature from 'src/shared/security/jwtFeature.utils';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) {}
    

//Register service
async signup(signUpDto: SignUpDTO): Promise<UserEntity> {
    const { password, password_confirm } = signUpDto;

    if (password !== password_confirm) {
        throw new BadRequestException('Passwords do not match!');
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        const user = await this.userService.create({
            ...signUpDto,
            password: hashedPassword,
            attributionDate: new Date()
        });

        return user;
    } catch (error) {
        throw new InternalServerErrorException(
            error,
            "Une erreur est survenue lors de l'inscrpition.",
          );

    }
}

//Login user
async login(dto: LoginDTO): Promise<{ token: string, user: any }> {
    const { email, password } = dto;

    const user = await this.userService.findOneByEmail(email);
    console.log('before', user);
    if (!user) {
        throw new UnauthorizedException('Invalid email adress or password.');
    }
    
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    console.log('Paswword', isPasswordMatched);
    if (!isPasswordMatched) {
        throw new UnauthorizedException('Invalid email adress or password');
    }

    const token = await JwtFeature.assignJwtToken(user.id, this.jwtService);
    console.log(token);

    return { token, user };
}

    
}
