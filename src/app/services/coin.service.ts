import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { Observable, of } from 'rxjs'; // Use Observable for API calls

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  // Static data for now
  private coinData: { [key: string]: { definition: string, objectives: string, chartData: any } } = {
    bitcoin: {
      definition: "Bitcoin is a decentralized digital currency...",
      objectives: "Bitcoin aims to provide a decentralized, secure, and transparent way to transfer value globally.",
      chartData: {
        dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        prices: [1200, 1500, 1800, 2200, 2500, 2300, 2100],
      },
    },
    ethereum: {
      definition: "Ethereum is a decentralized, open-source blockchain...",
      objectives: "Ethereum aims to enable decentralized applications (dApps) and smart contracts...",
      chartData: {
        dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        prices: [3000, 3200, 3300, 3400, 3500, 3600, 3800],
      },
    },
    solana: {
      definition: "Solana is a high-performance blockchain...",
      objectives: "Solana aims to provide fast, secure, and scalable blockchain solutions...",
      chartData: {
        dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        prices: [100, 110, 120, 130, 140, 150, 160],
      },
    },
  };

  constructor(private http: HttpClient) {} // Inject HttpClient for API calls

  // Method to get coin data (static for now)
  getCoinData(coinName: string): Observable<{ definition: string, objectives: string } | null> {
    const coinKey = coinName.toLowerCase();
    const data = this.coinData[coinKey] || null;
    return of(data); // Return an Observable (mock API call)
  }

  // TODO: Replace with actual API call later (backend!!!!)
  //getCoinData(coinName: string): Observable<{ definition: string, objectives: string } | null> {
    //return this.http.get<{ definition: string, objectives: string }>(`/api/coins/${coinName}`);
//}
}
