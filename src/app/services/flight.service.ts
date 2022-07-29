import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { htppOption } from 'src/app/common/httpOption';
import { Journey } from '../models/journey.model';
import { RequestF } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  url: string = 'https://localhost:7229/api/Flight';

  constructor(private http: HttpClient) { }

  getFlight(request: RequestF): Observable<Journey>{
    return this.http.post<Journey>(this.url, request, htppOption)
  }
}
