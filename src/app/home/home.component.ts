import { Component } from '@angular/core';
import { CoinService } from '../services/coin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchQuery: string = '';
  currentCoin: { definition: string, objectives: string } | null = null;

  constructor(private coinService: CoinService) {}

  searchCoin() {
    this.coinService.getCoinData(this.searchQuery).subscribe(
      (data) => {
        this.currentCoin = data;
      },
      (error) => {
        console.error('Error fetching coin data:', error);
        this.currentCoin = null;
      }
    );
  }
}