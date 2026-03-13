export const demoDataset = [
  {
    batchId: "MED-001",
    productName: "Painkiller",
    manufacturer: "ABC Pharma",
    manufactureDate: "2026-02-25",
    expiryDate: "2028-02-25",
    transfers: [
      {
        from: "Manufacturer",
        to: "Distributor",
        location: "Kolkata",
        timestamp: "2026-03-13T09:00:00",
      },
      {
        from: "Distributor",
        to: "Retailer",
        location: "Delhi",
        timestamp: "2026-03-13T13:30:00",
      },
    ],
    scans: [
      {
        location: "Delhi",
        role: "Retailer",
        timestamp: "2026-03-13T13:40:00",
      },
      {
        location: "Delhi",
        role: "Consumer",
        timestamp: "2026-03-13T15:10:00",
      },
    ],
  },
  {
    batchId: "MED-002",
    productName: "Antibiotic",
    manufacturer: "ZenCure Labs",
    manufactureDate: "2026-02-20",
    expiryDate: "2028-02-20",
    transfers: [
      {
        from: "Manufacturer",
        to: "Distributor",
        location: "Delhi",
        timestamp: "2026-03-13T10:00:00",
      },
      {
        from: "Distributor",
        to: "Retailer",
        location: "Mumbai",
        timestamp: "2026-03-13T14:00:00",
      },
    ],
    scans: [
      {
        location: "Delhi",
        role: "Distributor",
        timestamp: "2026-03-13T10:05:00",
      },
      {
        location: "Mumbai",
        role: "Retailer",
        timestamp: "2026-03-13T10:07:00",
      },
    ],
  },
  {
    batchId: "MED-003",
    productName: "Vitamin Syrup",
    manufacturer: "NutriMeds",
    manufactureDate: "2026-02-15",
    expiryDate: "2027-08-15",
    transfers: [
      {
        from: "Manufacturer",
        to: "Distributor",
        location: "Hyderabad",
        timestamp: "2026-03-13T08:30:00",
      },
      {
        from: "Distributor",
        to: "Retailer",
        location: "Bengaluru",
        timestamp: "2026-03-13T11:00:00",
      },
    ],
    scans: [
      {
        location: "Bengaluru",
        role: "Retailer",
        timestamp: "2026-03-13T11:05:00",
      },
      {
        location: "Bengaluru",
        role: "Retailer",
        timestamp: "2026-03-13T11:06:00",
      },
      {
        location: "Bengaluru",
        role: "Retailer",
        timestamp: "2026-03-13T11:07:00",
      },
      {
        location: "Bengaluru",
        role: "Retailer",
        timestamp: "2026-03-13T11:08:00",
      },
      {
        location: "Bengaluru",
        role: "Retailer",
        timestamp: "2026-03-13T11:09:00",
      },
      {
        location: "Bengaluru",
        role: "Consumer",
        timestamp: "2026-03-13T11:10:00",
      },
      {
        location: "Bengaluru",
        role: "Consumer",
        timestamp: "2026-03-13T11:11:00",
      },
    ],
  },
  {
    batchId: "MED-004",
    productName: "Insulin Pen",
    manufacturer: "LifeLine Biotech",
    manufactureDate: "2026-02-28",
    expiryDate: "2027-12-31",
    transfers: [
      {
        from: "Manufacturer",
        to: "Distributor",
        location: "Pune",
        timestamp: "2026-03-13T10:30:00",
      },
      {
        from: "Distributor",
        to: "Retailer",
        location: "Chennai",
        timestamp: "2026-03-13T12:45:00",
      },
    ],
    scans: [
      {
        location: "Chennai",
        role: "Retailer",
        timestamp: "2026-03-13T11:55:00",
      },
      {
        location: "Chennai",
        role: "Consumer",
        timestamp: "2026-03-13T12:00:00",
      },
    ],
  },
  {
    batchId: "MED-005",
    productName: "Cough Relief",
    manufacturer: "HealWell Pharma",
    manufactureDate: "2026-02-18",
    expiryDate: "2027-11-18",
    recallDate: "2026-03-13T09:15:00",
    transfers: [
      {
        from: "Manufacturer",
        to: "Distributor",
        location: "Ahmedabad",
        timestamp: "2026-03-13T07:45:00",
      },
      {
        from: "Distributor",
        to: "Retailer",
        location: "Jaipur",
        timestamp: "2026-03-13T08:50:00",
      },
    ],
    scans: [
      {
        location: "Jaipur",
        role: "Retailer",
        timestamp: "2026-03-13T09:05:00",
      },
      {
        location: "Jaipur",
        role: "Consumer",
        timestamp: "2026-03-13T09:20:00",
      },
    ],
  },
];

export default demoDataset;
