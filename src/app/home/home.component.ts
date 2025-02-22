import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  coinData: { [key: string]: { definition: string, objectives: string } } = {
    bitcoin: {
      definition: "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.",
      objectives: "Bitcoin aims to provide a decentralized, secure, and transparent way to transfer value globally."
    },
    ethereum: {
      definition: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform.",
      objectives: "Ethereum aims to enable decentralized applications (dApps) and smart contracts to run without downtime, fraud, or interference from third parties."
    },
    solana: {
      definition: "Solana is a high-performance blockchain supporting decentralized apps and crypto-currencies.",
      objectives: "Solana aims to provide fast, secure, and scalable blockchain solutions for decentralized applications."
    }
  };

  searchQuery: string = '';
  currentCoin: { definition: string, objectives: string } | null = null;


  constructor() { }

  ngOnInit(): void {
  }
  searchCoin() {
    const coinKey = this.searchQuery.toLowerCase();
    this.currentCoin = this.coinData[coinKey] || null;
  }
}
