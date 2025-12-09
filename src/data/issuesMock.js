// Mock data for Issues dashboard - Village Officer view
// TODO: Replace with real API calls when backend is ready

export const mockIssuesData = {
  farmers: [
    {
      id: 1,
      name: 'Rajesh Kumar',
      village: 'Rampur',
      contact: '+91 98765 43210',
      crops: ['Paddy', 'Wheat'],
      totalAreaAffected: 5.5,
      damages: [
        {
          id: 101,
          type: 'crop',
          cropName: 'Paddy',
          areaAffected: 3.5,
          severity: 'High',
          estimatedLoss: 45000,
          description: 'Flood damage - complete crop loss in lower fields',
          date: '2024-12-01'
        },
        {
          id: 102,
          type: 'crop',
          cropName: 'Wheat',
          areaAffected: 2.0,
          severity: 'Medium',
          estimatedLoss: 18000,
          description: 'Pest infestation - partial damage',
          date: '2024-12-03'
        },
        {
          id: 103,
          type: 'equipment',
          equipmentType: 'Tractor',
          estimatedRepairCost: 25000,
          description: 'Engine damage due to flooding',
          status: 'Pending'
        }
      ]
    },
    {
      id: 2,
      name: 'Priya Sharma',
      village: 'Rampur',
      contact: '+91 98765 43211',
      crops: ['Paddy', 'Maize'],
      totalAreaAffected: 4.2,
      damages: [
        {
          id: 201,
          type: 'crop',
          cropName: 'Paddy',
          areaAffected: 2.5,
          severity: 'High',
          estimatedLoss: 32000,
          description: 'Heavy rainfall - waterlogging',
          date: '2024-12-01'
        },
        {
          id: 202,
          type: 'crop',
          cropName: 'Maize',
          areaAffected: 1.7,
          severity: 'Low',
          estimatedLoss: 8500,
          description: 'Minor pest damage',
          date: '2024-12-04'
        },
        {
          id: 203,
          type: 'equipment',
          equipmentType: 'Irrigation Pump',
          estimatedRepairCost: 12000,
          description: 'Motor burnout',
          status: 'Verified'
        }
      ]
    },
    {
      id: 3,
      name: 'Amit Patel',
      village: 'Rampur',
      contact: '+91 98765 43212',
      crops: ['Wheat', 'Cotton'],
      totalAreaAffected: 3.8,
      damages: [
        {
          id: 301,
          type: 'crop',
          cropName: 'Wheat',
          areaAffected: 2.3,
          severity: 'Medium',
          estimatedLoss: 20000,
          description: 'Drought conditions - reduced yield',
          date: '2024-11-28'
        },
        {
          id: 302,
          type: 'crop',
          cropName: 'Cotton',
          areaAffected: 1.5,
          severity: 'High',
          estimatedLoss: 28000,
          description: 'Bollworm infestation',
          date: '2024-12-02'
        }
      ]
    },
    {
      id: 4,
      name: 'Sunita Devi',
      village: 'Rampur',
      contact: '+91 98765 43213',
      crops: ['Paddy', 'Sugarcane'],
      totalAreaAffected: 6.0,
      damages: [
        {
          id: 401,
          type: 'crop',
          cropName: 'Paddy',
          areaAffected: 4.0,
          severity: 'High',
          estimatedLoss: 52000,
          description: 'Cyclone damage - extensive crop loss',
          date: '2024-11-30'
        },
        {
          id: 402,
          type: 'crop',
          cropName: 'Sugarcane',
          areaAffected: 2.0,
          severity: 'Medium',
          estimatedLoss: 15000,
          description: 'Wind damage',
          date: '2024-11-30'
        },
        {
          id: 403,
          type: 'equipment',
          equipmentType: 'Harvester',
          estimatedRepairCost: 35000,
          description: 'Structural damage from debris',
          status: 'Pending'
        },
        {
          id: 404,
          type: 'equipment',
          equipmentType: 'Sprayer',
          estimatedRepairCost: 8000,
          description: 'Tank rupture',
          status: 'Verified'
        }
      ]
    },
    {
      id: 5,
      name: 'Ramesh Yadav',
      village: 'Rampur',
      contact: '+91 98765 43214',
      crops: ['Maize', 'Cotton'],
      totalAreaAffected: 2.5,
      damages: [
        {
          id: 501,
          type: 'crop',
          cropName: 'Maize',
          areaAffected: 1.5,
          severity: 'Low',
          estimatedLoss: 7500,
          description: 'Minor disease outbreak',
          date: '2024-12-05'
        },
        {
          id: 502,
          type: 'crop',
          cropName: 'Cotton',
          areaAffected: 1.0,
          severity: 'Medium',
          estimatedLoss: 12000,
          description: 'Aphid infestation',
          date: '2024-12-04'
        }
      ]
    },
    {
      id: 6,
      name: 'Lakshmi Iyer',
      village: 'Rampur',
      contact: '+91 98765 43215',
      crops: ['Paddy'],
      totalAreaAffected: 3.0,
      damages: [
        {
          id: 601,
          type: 'crop',
          cropName: 'Paddy',
          areaAffected: 3.0,
          severity: 'Medium',
          estimatedLoss: 28000,
          description: 'Nutrient deficiency - yellowing',
          date: '2024-12-06'
        },
        {
          id: 602,
          type: 'equipment',
          equipmentType: 'Tiller',
          estimatedRepairCost: 6000,
          description: 'Blade damage',
          status: 'Pending'
        }
      ]
    }
  ]
};

// Subsidy caps and coverage factors
export const subsidyConfig = {
  cropCaps: {
    'Paddy': 10000,
    'Wheat': 8000,
    'Maize': 6000,
    'Cotton': 9000,
    'Sugarcane': 7000
  },
  equipmentCaps: {
    'Tractor': 20000,
    'Harvester': 25000,
    'Irrigation Pump': 10000,
    'Sprayer': 6000,
    'Tiller': 5000
  },
  severityFactors: {
    'Low': 0.3,
    'Medium': 0.6,
    'High': 0.9
  },
  equipmentCoverageRate: 0.75 // 75% of repair cost
};
