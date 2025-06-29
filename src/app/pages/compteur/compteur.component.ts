import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-compteur',
  standalone: true,
  imports: [NgIf],
  templateUrl: './compteur.component.html',
  styleUrls: ['./compteur.component.css']
})
export class CompteurComponent {
  compteur = 0;

  incrementer() {
    this.compteur++;
  }

  decrementer() {
    if (this.compteur > 0) this.compteur--;
  }
}
