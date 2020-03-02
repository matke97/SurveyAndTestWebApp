import { PitanjeModel } from './PitanjeModel';

export class Anketa
{
    naziv:string;
    opis:string;
    pocetak : Date;
    kraj : Date;
    pitanjaLista : Array<PitanjeModel> = new Array<PitanjeModel>();
    personalizovana :boolean;
    autor : string;
    tip:string;
    brStrana : number;
    vreme : number;
}