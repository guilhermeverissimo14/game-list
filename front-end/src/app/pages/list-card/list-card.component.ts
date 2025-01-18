import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameListService } from 'src/app/services/game-list.service';
import { Game } from 'src/app/types/gameTypes';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {

  constructor(
    private gameList: GameListService,
    private route: ActivatedRoute
  ) { }

  id: string | null = this.route.snapshot.paramMap.get('id');

  game$: Observable<Game> = this.gameList.getGameById(Number(this.id));

  item!: Game;

  ngOnInit(): void {
    this.game$.subscribe(game => {
      this.item = game;
    });

  }
}
