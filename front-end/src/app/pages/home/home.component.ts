import { Component } from '@angular/core';
import { GameListService } from '../../services/game-list.service';
import { Observable } from 'rxjs';
import { Game, Genre } from '../../types/gameTypes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private readonly gameList: GameListService) { }

  tabGame: boolean = true;
  tabGenre: boolean = false;


  games$: Observable<Game[]> = this.gameList.getGameList();
  genres$: Observable<Genre[]> = this.gameList.getGenreList();


  changeTabGame() {
    this.tabGame = true;
    this.tabGenre = false;
  }

  changeTabGenre() {
    this.tabGame = false;
    this.tabGenre = true;
  }

}
