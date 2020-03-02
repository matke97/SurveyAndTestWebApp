import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first, map } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class  AnketaService {

  server : string = "http://localhost:8000/";
  constructor(private http: HttpClient){}

  /*******
   * @brief Function sends http get request to server in order to get all questions are asked in all surveys in past
   * @returns List of all questions
   *******/
  getQuestions()
  {
    return this.http.get<any>(this.server + 'anketa/getPitanja')
    .pipe(map(
      data =>
      {
        if(data)
        {
          console.log(data);
          var niz = [];
          for(let d of data)
          {
            console.log(d.tekstPitanja);
            niz.push(d.tekstPitanja);
          }
          return niz;
        }
      }
    ));
  }

  /**
   * @brief Funtion sends http post request in order to save new survey/test in database
   * @param[in] data JSON object contains all information about created survey/test
   * @returns Observable<any> - Is operation successfully
   */
  unesiAnketu(data)
  {
    return this.http.post(this.server + 'anketa/regAnketu', data);
  }


  /**
   * 
   * @brief : Method to get all surveys/tests that user didn't create
   * @param[in] idUser : id of logged in user
   * @param[in] username : userName of the currently logged in user
   * @returns Observable<any> - List of all available surveys/test with required info
   * 
   */
  getDostupneAnketeTestove(idUser, username)
  {
    var a = {
      _idUser :idUser,
      userName : username
    };
    console.log(a);
    return this.http.post<any>(this.server + 'anketa/getDostupne', a);
  }

  /**
   * @brief Method to get whole survey/test by Id 
   * @param id ID of survey/test
   * @returns Observable<any> - JSON object with Anketa object
   */
  getAnketaByID(id)
  {
    var a =  {
      _id : id
    };
    console.log(a);
    return this.http.post<any>(this.server + 'anketa/getbyid', a);
  }

  getMojeAnkete(user)
  {
    var a = {
      userName : user
    };

    return this.http.post<any>(this.server + 'anketa/getMojeAnkete', a);
  }

  obrisiAnketu(id)
  {
    var a = 
    {
      _id : id
    };
    return this.http.post<any>(this.server + 'anketa/obrisiAnketu', a);
  }

  submitTest(podaci)
  {
    console.log('SUB test');
    console.log(podaci);
    return this.http.post<any>(this.server + 'anketa/submitTest', podaci);
  }
  submitSurvey(data)
  {
    return this.http.post<any>(this.server + 'anketa/submitSurvey', data);
  }
  saveState(data)
  {
    console.log('insert nedovrsenu');
    console.log(data);
    return this.http.post<any>(this.server + 'anketa/insertNedovrsenu', data);
  }

  /**
   * 
   * @param pod[in] - Contains _idAnketa and _idUser as keys for searchin database
   * @returns Observable -> object of 
   */
  getNedovrsena(pod)
  {
    return this.http.post<any>(this.server + 'anketa/getNedovrsena', pod);
    /*.pipe(map(
      data =>
      {

      }
    ))*/
  }

  /***
   * @brief : Metoda koja vraca sve popunjene ankete/testove
   * @param[in] id : IdAnkete
   * @returns : Observable<any> Sve popunjene anketne listice / testove sa osvojenim poenima i odgovrima
   */
  getPopunjene(id)
  {
    var s =
    {
      _idAnkete : id
    };
    return this.http.post<any>(this.server + 'anketa/getPopunjene', s);
  }
}
