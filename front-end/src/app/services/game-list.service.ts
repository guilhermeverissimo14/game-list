import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environments';
import { Observable } from 'rxjs';
import { Game, Genre } from '../types/gameTypes';

@Injectable({
  providedIn: 'root'
})
export class GameListService {

  constructor(private readonly http: HttpClient) { }

  getGameList(): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.apiUrl}/games`);
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${environment.apiUrl}/games/${id}`);
  }

  getGenreList(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${environment.apiUrl}/lists`);
  }

  getGenreById(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${environment.apiUrl}/lists/${id}`);
  }


}
