import { IsNotEmpty } from "class-validator";

export class ProgramCreateDTO{
    @IsNotEmpty()
    title:string;
    @IsNotEmpty()
    contenu:string;
}