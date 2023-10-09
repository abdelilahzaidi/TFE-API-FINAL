import { IsString, IsArray, IsInt } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  titre: string;

  @IsString()
  contenu: string;

  @IsArray()
  receivers: number[]; 

  @IsInt() 
  senderId: number;
}
