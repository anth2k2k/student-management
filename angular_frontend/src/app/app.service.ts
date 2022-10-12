import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/xml',
      'Accept': 'application/xml',
      'Response-Type': 'text',
    }),
  };

  constructor(private _http: HttpClient) {}

  getStudentsFromAPI(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/', { responseType: 'text' });
  }

  getStudentByIdFromAPI(id: number): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/get-student/' + id, { responseType: 'text' });
  }

  createStudentToAPI(student: string): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/create-student', student, this.httpOptions);
  }

  updateStudentByIdToAPI(id: number, student: string): Observable<any> {
    return this._http.put("http://127.0.0.1:8000/update-student/" + id, student, this.httpOptions);
  }

  deleteStudentByIdToAPI(id: number): Observable<any> {
    return this._http.delete('http://127.0.0.1:8000/delete-student/' + id);
  }
}
