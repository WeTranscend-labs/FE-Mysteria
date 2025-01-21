
# Mysteria - Your NFT, Your Story 🔗
![License](https://img.shields.io/badge/License-MIT-blue.svg)  ![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen) ![Version](https://img.shields.io/badge/Version-1.0.0-orange) ![Platform](https://img.shields.io/badge/platform-Web3-blueviolet) ![Blockchain](https://img.shields.io/badge/blockchain-Ethereum-blue)

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Deployment](#deployment)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Project Overview
Mysteria is a revolutionary blockchain-powered NFT Gacha platform that transforms digital collectibles into an exciting, transparent, and engaging experience. By leveraging blockchain technology and innovative game mechanics, Mysteria reimagines NFT collection through a unique gacha system that combines randomness, strategy, and digital ownership.

At the core of Mysteria lies a dynamic ecosystem where users can draw, collect, and upgrade NFTs across multiple rarity tiers - from common to legendary. Unlike traditional NFT marketplaces, Mysteria introduces an element of chance and progression, making each NFT acquisition a thrilling journey of discovery and potential.

## ✨ Features

| Feature | Description | Status |  
|--|--|--|
| Gacha NFT | Randomized NFT drawing mechanism with multiple rarity tiers | ✅ Active | 
| Gacha NFT System | Secure minting and ownership via smart contracts | ✅ Active | 
| Upgrade Mechanism | Strategic NFT enhancement with risk-reward system | ✅ Active | 
| Chainlink VRF Randomization | Verifiable random number generation for fair draws | 🟠 In Development | 
| Multi-Tier Pricing | Flexible draw options for different user budgets | ✅ Active | 
| Community Features | Events, challenges, and interactive elements | 🔜 Planned | 
| Secondary Marketplace | Trading and selling of collected NFTs | 🔜 Planned | 
| Cross-Chain Compatibility | Support for multiple blockchain networks | 🔜 Planned | 

## 🌐 Deployment

The Mysteria platform is live and can be accessed at:

**Deployment Link**: [Mysteria | NFT Gacha Platform](https://wt-mysteria.vercel.app/)

Unlock the potential of digital collectibles on Mysteria - a cutting-edge platform leveraging blockchain technology to provide a dynamic, secure, and interactive NFT gacha experience.

## 🛠 Getting Started
Follow the steps below to set up the project locally.

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Blockchain wallet (e.g., MetaMask)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/WeTranscend-labs/FE-Mysteria.git
   cd FE-Mysteria
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     NEXT_PUBLIC_APP_NAME=YourAppName
	 NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-wallet-connect-project-id
     ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to: 
	```bash
	http://localhost:3000
	```    
	You should now see the Mysteria platform running locally on your machine! 🚀

## 💻 Technologies Used
### Frontend

-   **Next.js**: Server-side rendering powerhouse, delivering fast, SEO-optimized web applications with intelligent routing and API integration.
    
-   **TypeScript**: Robust type-checking layer that transforms JavaScript development, reducing errors and enhancing code predictability.
    
-   **Tailwind CSS**: Utility-first design system enabling rapid, consistent UI development with pixel-perfect responsiveness.

### Smart Contracts Language

-   **Solidity**: The primary language for writing Ethereum smart contracts, enabling the development of decentralized applications (dApps) with features like inheritance and complex data types.

### Blockchain Interaction

-   **Ethers.js**: Lightweight Ethereum blockchain library providing a comprehensive API for transactions, smart contract interactions, and wallet management.
    
-   **Wagmi**: React Hooks library that streamlines Ethereum wallet connections, state management, and transaction handling.
    
-   **Viem**: Modern Ethereum interaction library offering efficient blockchain communication with advanced features like caching and automatic retries.

### Others

-   **React Hook Form**: A library for managing form state in React applications. It simplifies form

## 📂 Project Architecture
```
.
├── app/                  # Folder for Next.js app-specific routing and page components
├── components/           # Contains reusable UI components like buttons, forms, modals, etc.
├── configs/              # Contains configuration files for system settings or environment configurations
├── constants/            # Contains constants used throughout the application
├── contexts/             # Contains React contexts for managing global state across the app
├── lib/                  # Contains reusable libraries or helper functions
└── .env                  # Environment file 
```

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to Mysteria, please fork the repository, make your changes, and submit a pull request. We appreciate your help!


## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

----------

**Built with 💖 by WeTranscend Labs**
