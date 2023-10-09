import {
    IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,  
} from 'class-validator';
import { UserGender } from 'src/commun/enums/gender.enum';
import { UserStatus } from 'src/commun/enums/status.enum';


export class SignUpDTO {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address' })
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()  
  password_confirm: string;

  @IsNotEmpty()
  @IsIn(['member', 'admin','responsale'], { message: 'Invalid status' }) 
  status: UserStatus;

  @IsNotEmpty()
  @IsIn(['male', 'female'], { message: 'Invalid gender' }) 
  gender: UserGender

  @IsNotEmpty()
    grade:string;

  @IsNotEmpty()
  birthDate: Date;

  @IsNotEmpty()
  rue: string;

  @IsNotEmpty()
  commune: string;

  @IsNotEmpty()
  ville: string;

  @IsNotEmpty()
  @IsBoolean()
  actif: boolean;

  @IsNotEmpty()
  gsm: string;
  constructor() {
    this.status = UserStatus.MEMBER; 
}
}
