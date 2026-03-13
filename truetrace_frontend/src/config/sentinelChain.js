export const APP_NAME = "True Trace";

export const NETWORK_NAME = "Sepolia";

export const ROLES = Object.freeze({
  MANUFACTURER: "Manufacturer",
  DISTRIBUTOR: "Distributor",
  RETAILER: "Retailer",
  CONSUMER: "Consumer",
  REGULATOR: "Regulator",
});

export const ROLE_OPTIONS = [
  ROLES.MANUFACTURER,
  ROLES.DISTRIBUTOR,
  ROLES.RETAILER,
  ROLES.CONSUMER,
  ROLES.REGULATOR,
];

export const CONTRACT_ADDRESS = "0xbF144B079d290eaE62Ae97274D39DFa71E012Eb9";

export const SENTINEL_CHAIN_ABI = [
  {
    inputs: [
      { internalType: "string", name: "_batchId", type: "string" },
      { internalType: "string", name: "_drugName", type: "string" },
      { internalType: "string", name: "_mfgDate", type: "string" },
      { internalType: "string", name: "_expDate", type: "string" },
    ],
    name: "createBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_batchId", type: "string" }],
    name: "recallBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_batchId", type: "string" },
      { internalType: "address", name: "_newOwner", type: "address" },
    ],
    name: "transferBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "batches",
    outputs: [
      { internalType: "string", name: "batchId", type: "string" },
      { internalType: "string", name: "drugName", type: "string" },
      { internalType: "string", name: "manufactureDate", type: "string" },
      { internalType: "string", name: "expiryDate", type: "string" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "bool", name: "recalled", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "regulator",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_batchId", type: "string" }],
    name: "verifyBatch",
    outputs: [
      { internalType: "string", name: "batchId", type: "string" },
      { internalType: "string", name: "drugName", type: "string" },
      { internalType: "string", name: "manufactureDate", type: "string" },
      { internalType: "string", name: "expiryDate", type: "string" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "bool", name: "recalled", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
];
