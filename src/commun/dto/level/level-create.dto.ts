import { IsNotEmpty } from "class-validator";


export class CreateLevelDto {
    @IsNotEmpty()
    grade: string;    
    programId: number;
}