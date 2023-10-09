import { IsNotEmpty } from "class-validator";
import { DayOfWeek } from "src/commun/entities/horaire/horaire";
import { Compare } from "src/shared/security/decorators/isGreaterThanDate.decorator";


export class CreateHoraireDto {
    @IsNotEmpty()
    heureDebut: string;   
    
    @IsNotEmpty()
    @Compare(({heureDebut, heureFin}: CreateHoraireDto) => heureDebut < heureFin, { message: "L'heure de fin de l'horaire doit etre postérieur à l'heure de début de l'horaire" })
    heureFin: string; 

    @IsNotEmpty()
    jour: DayOfWeek; 
    
}