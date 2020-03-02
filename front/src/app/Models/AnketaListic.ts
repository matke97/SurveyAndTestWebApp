import { Person } from './Person';

export class AnketaListic
{
    _idAnkete;
    _idUser;
    //ILI OVAKO ILI KEY VALUE DA BUDE
    pitanja : Array<string> = [];
    odgovori : Array<any> = [];
    ispitanik:Person = new Person();

}