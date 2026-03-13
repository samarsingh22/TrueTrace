# True Trace Frontend

True Trace is a decentralized product authenticity and anti-counterfeit intelligence platform.

This frontend is built with React + Vite and reuses the original TrueTrace UI theme while adding a modular architecture for wallet auth, blockchain interactions, QR verification, anomaly detection, and trust score analytics.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Modular Architecture

- `src/features/landing/LandingPage.jsx`: Landing page feature module.
- `src/features/dashboard/DashboardPage.jsx`: Dashboard feature module.
- `src/features/analytics/AnalyticsPage.jsx`: Analytics feature module.
- `src/features/docs/DocsPage.jsx`: Documentation feature module.
- `src/config/sentinelChain.js`: App, role, network, contract address, and ABI constants.
- `src/services/sentinelChainClient.js`: Ethers.js wallet + contract interaction layer.
- `src/services/qrVerification.js`: QR payload generation and QR/batch input parsing.
- `src/services/anomalyDetection.js`: Client-side anomaly rule checks.
- `src/services/trustScore.js`: Dynamic trust score computation.
- `src/services/scanTelemetry.js`: Local scan telemetry persistence and zone tagging.
- `src/hooks/useSentinelDashboard.js`: Role-based dashboard state and workflows.

## Supported Roles

- Manufacturer
- Distributor
- Retailer
- Consumer
- Regulator

## Core Flows

1. MetaMask wallet connection and on-chain identity access.
2. Batch registration and QR payload generation.
3. Custody transfer through supply chain actors.
4. Consumer verification using Batch ID or QR JSON payload.
5. Regulator-driven emergency recalls.
6. Real-time trust scoring based on anomaly flags and recalls.
