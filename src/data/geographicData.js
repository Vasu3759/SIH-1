// Geography Model & Station-to-Block Mapping for Northern Railway (Delhi Division)
// Preserves Administrative vs Operational Hierarchy

export const ZONES = [
  { id: 'NR', name: 'Northern Railway', code: 'NR' },
  { id: 'WR', name: 'Western Railway', code: 'WR' },
  { id: 'NCR', name: 'North Central Railway', code: 'NCR' },
  { id: 'ER', name: 'Eastern Railway', code: 'ER' }
];

export const DIVISIONS = [
  { id: 'DLI', zoneId: 'NR', name: 'Delhi', code: 'DLI' },
  { id: 'UMB', zoneId: 'NR', name: 'Ambala', code: 'UMB' },
  { id: 'MB', zoneId: 'NR', name: 'Moradabad', code: 'MB' },
  { id: 'LKO', zoneId: 'NR', name: 'Lucknow', code: 'LKO' }
];

export const ADMINISTRATIVE_HIERARCHY = {
  zone: 'Northern Railway (NR)',
  division: 'Delhi (DLI)',
  sections: [
    { id: 'SEC-DLI-GZB', name: 'Delhi - Ghaziabad Section', depot: 'Sr.DEN / Line / DLI' },
    { id: 'SEC-DLI-NDLS', name: 'Delhi - New Delhi Section', depot: 'Sr.DEN / Estate / DLI' },
    { id: 'SEC-GZB-TDL', name: 'Ghaziabad - Tundla Section', depot: 'Sr.DEN / II / DLI' }
  ]
};

export const OPERATIONAL_HIERARCHY = {
  corridor: 'DLI-NDLS-GZB Main Line Corridor',
  blockSections: [
    {
      id: 'BLK-CYZ-GZB',
      code: 'CYZ-GZB',
      name: 'Chander Nagar (CYZ) – Ghaziabad (GZB)',
      stations: ['CYZ', 'GZB'],
      lines: ['Line 1', 'Line 2', 'Line 3 (Goods)'],
      directions: ['UP', 'DN', 'BOTH'],
      startKm: 112.4,
      endKm: 124.8,
      totalCapacityHoursPerWeek: 42,
      maxSlotsPerDay: 8
    },
    {
      id: 'BLK-DLI-ANVT',
      code: 'DLI-ANVT',
      name: 'Old Delhi (DLI) – Anand Vihar (ANVT)',
      stations: ['DLI', 'DSA', 'ANVT'],
      lines: ['Line 1', 'Line 2'],
      directions: ['UP', 'DN'],
      startKm: 101.2,
      endKm: 112.4,
      totalCapacityHoursPerWeek: 38,
      maxSlotsPerDay: 7
    },
    {
      id: 'BLK-GZB-MTC',
      code: 'GZB-MTC',
      name: 'Ghaziabad (GZB) – Meerut City (MTC)',
      stations: ['GZB', 'MDNR', 'MTC'],
      lines: ['Line 1', 'Line 2'],
      directions: ['UP', 'DN'],
      startKm: 124.8,
      endKm: 148.5,
      totalCapacityHoursPerWeek: 35,
      maxSlotsPerDay: 6
    },
    {
      id: 'BLK-NDLS-NZM',
      code: 'NDLS-NZM',
      name: 'New Delhi (NDLS) – Hazrat Nizamuddin (NZM)',
      stations: ['NDLS', 'TKJ', 'NZM'],
      lines: ['Line 1', 'Line 2', 'Line 3'],
      directions: ['UP', 'DN', 'BOTH'],
      startKm: 0.0,
      endKm: 7.2,
      totalCapacityHoursPerWeek: 45,
      maxSlotsPerDay: 9
    }
  ]
};

// Station-to-Block Section Mapping Table
// Joins asset physical location (from SMMS/TMS/TDMS) to operational track geography (COA)
export const STATION_TO_BLOCK_MAPPING = [
  { stationCode: 'CYZ', stationName: 'Chander Nagar', blockSection: 'CYZ-GZB', corridor: 'DLI-GZB Line', kmRange: '112.4 - 116.2' },
  { stationCode: 'GZB', stationName: 'Ghaziabad Junction', blockSection: 'CYZ-GZB', corridor: 'DLI-GZB Line', kmRange: '116.2 - 124.8' },
  { stationCode: 'DLI', stationName: 'Old Delhi Junction', blockSection: 'DLI-ANVT', corridor: 'DLI-ANVT Line', kmRange: '101.2 - 106.8' },
  { stationCode: 'ANVT', stationName: 'Anand Vihar Terminal', blockSection: 'DLI-ANVT', corridor: 'DLI-ANVT Line', kmRange: '106.8 - 112.4' },
  { stationCode: 'MDNR', stationName: 'Modinagar', blockSection: 'GZB-MTC', corridor: 'GZB-MTC Line', kmRange: '124.8 - 136.0' },
  { stationCode: 'MTC', stationName: 'Meerut City', blockSection: 'GZB-MTC', corridor: 'GZB-MTC Line', kmRange: '136.0 - 148.5' },
  { stationCode: 'NDLS', stationName: 'New Delhi', blockSection: 'NDLS-NZM', corridor: 'NDLS-NZM Line', kmRange: '0.0 - 3.5' },
  { stationCode: 'NZM', stationName: 'Hazrat Nizamuddin', blockSection: 'NDLS-NZM', corridor: 'NDLS-NZM Line', kmRange: '3.5 - 7.2' }
];
