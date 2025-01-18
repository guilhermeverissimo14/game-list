import { Genre } from './../../types/gameTypes';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  constructor(private router: Router) { }

  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() image: string = '';

  handleNavigation(id: number) {
    this.router.navigate([`/list-card`, id]);
  }

}
