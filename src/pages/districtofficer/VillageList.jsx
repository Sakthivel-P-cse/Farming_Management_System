import React from 'react';
import { useNavigate } from 'react-router-dom';

const villageData = [
  { 
    name: "Rampur", 
    officer: { name: "Amit Kumar", contact: "9876543210", designation: "Village Officer", email: "amit.kumar@village.gov.in" }, 
    farmers: 120, 
    crops: ["Wheat", "Rice"], 
    area: 54000,
    population: 2500,
    households: 450,
    literacyRate: 78,
    mainOccupation: "Agriculture",
    nearestTown: "Lucknow (15 km)",
    established: "1945",
    pincode: "226001"
  },
  { 
    name: "Lakshmi Nagar", 
    officer: { name: "Priya Singh", contact: "9876543222", designation: "Village Officer", email: "priya.singh@village.gov.in" }, 
    farmers: 80, 
    crops: ["Sugarcane", "Maize"], 
    area: 32000,
    population: 1800,
    households: 320,
    literacyRate: 65,
    mainOccupation: "Agriculture",
    nearestTown: "Kanpur (20 km)",
    established: "1952",
    pincode: "226002"
  },
  { 
    name: "Shanti Puram", 
    officer: { name: "Ravi Verma", contact: "9876543233", designation: "Village Officer", email: "ravi.verma@village.gov.in" }, 
    farmers: 150, 
    crops: ["Paddy", "Cotton"], 
    area: 75000,
    population: 3200,
    households: 580,
    literacyRate: 82,
    mainOccupation: "Agriculture",
    nearestTown: "Allahabad (25 km)",
    established: "1938",
    pincode: "226003"
  },
  { 
    name: "Green Valley", 
    officer: { name: "Suresh Patil", contact: "9876543244", designation: "Village Officer", email: "suresh.patil@village.gov.in" }, 
    farmers: 90, 
    crops: ["Millet", "Barley"], 
    area: 40000,
    population: 2100,
    households: 380,
    literacyRate: 72,
    mainOccupation: "Agriculture",
    nearestTown: "Varanasi (18 km)",
    established: "1955",
    pincode: "226004"
  },
  { 
    name: "Rose Colony", 
    officer: { name: "Anjali Mehta", contact: "9876543255", designation: "Village Officer", email: "anjali.mehta@village.gov.in" }, 
    farmers: 70, 
    crops: ["Sugarcane", "Tomato"], 
    area: 28000,
    population: 1600,
    households: 290,
    literacyRate: 69,
    mainOccupation: "Agriculture",
    nearestTown: "Agra (22 km)",
    established: "1960",
    pincode: "226005"
  },
  { 
    name: "Nirmal Nagar", 
    officer: { name: "Vikram Singh", contact: "9876543266", designation: "Village Officer", email: "vikram.singh@village.gov.in" }, 
    farmers: 110, 
    crops: ["Maize", "Wheat"], 
    area: 50000,
    population: 2300,
    households: 420,
    literacyRate: 75,
    mainOccupation: "Agriculture",
    nearestTown: "Meerut (16 km)",
    established: "1948",
    pincode: "226006"
  },
  { 
    name: "Sunpura", 
    officer: { name: "Rekha Sharma", contact: "9876543277", designation: "Village Officer", email: "rekha.sharma@village.gov.in" }, 
    farmers: 95, 
    crops: ["Rice", "Cotton"], 
    area: 45000,
    population: 2000,
    households: 360,
    literacyRate: 71,
    mainOccupation: "Agriculture",
    nearestTown: "Bareilly (19 km)",
    established: "1951",
    pincode: "226007"
  },
  { 
    name: "Nehru Nagar", 
    officer: { name: "Ajay Kumar", contact: "9876543288", designation: "Village Officer", email: "ajay.kumar@village.gov.in" }, 
    farmers: 85, 
    crops: ["Paddy", "Millet"], 
    area: 35000,
    population: 1900,
    households: 340,
    literacyRate: 68,
    mainOccupation: "Agriculture",
    nearestTown: "Ghaziabad (21 km)",
    established: "1956",
    pincode: "226008"
  },
  { 
    name: "Ganga Pur", 
    officer: { name: "Neha Joshi", contact: "9876543299", designation: "Village Officer", email: "neha.joshi@village.gov.in" }, 
    farmers: 130, 
    crops: ["Wheat", "Sugarcane"], 
    area: 60000,
    population: 2800,
    households: 510,
    literacyRate: 80,
    mainOccupation: "Agriculture",
    nearestTown: "Haridwar (14 km)",
    established: "1942",
    pincode: "226009"
  },
  { 
    name: "Lotus Park", 
    officer: { name: "Ramesh Iyer", contact: "9876543300", designation: "Village Officer", email: "ramesh.iyer@village.gov.in" }, 
    farmers: 75, 
    crops: ["Tomato", "Maize"], 
    area: 30000,
    population: 1700,
    households: 310,
    literacyRate: 66,
    mainOccupation: "Agriculture",
    nearestTown: "Mathura (23 km)",
    established: "1958",
    pincode: "226010"
  },
  { 
    name: "Ambedkar Nagar", 
    officer: { name: "Pooja Singh", contact: "9876543311", designation: "Village Officer", email: "pooja.singh@village.gov.in" }, 
    farmers: 100, 
    crops: ["Cotton", "Paddy"], 
    area: 48000,
    population: 2200,
    households: 400,
    literacyRate: 74,
    mainOccupation: "Agriculture",
    nearestTown: "Aligarh (17 km)",
    established: "1949",
    pincode: "226011"
  },
  { 
    name: "Anand Vihar", 
    officer: { name: "Manoj Patel", contact: "9876543322", designation: "Village Officer", email: "manoj.patel@village.gov.in" }, 
    farmers: 90, 
    crops: ["Millet", "Wheat"], 
    area: 42000,
    population: 1950,
    households: 350,
    literacyRate: 70,
    mainOccupation: "Agriculture",
    nearestTown: "Moradabad (20 km)",
    established: "1953",
    pincode: "226012"
  },
  { 
    name: "Happy Colony", 
    officer: { name: "Sonia Reddy", contact: "9876543333", designation: "Village Officer", email: "sonia.reddy@village.gov.in" }, 
    farmers: 80, 
    crops: ["Rice", "Maize"], 
    area: 36000,
    population: 1850,
    households: 330,
    literacyRate: 67,
    mainOccupation: "Agriculture",
    nearestTown: "Firozabad (24 km)",
    established: "1957",
    pincode: "226013"
  },
  { 
    name: "Mahadev Puram", 
    officer: { name: "Kiran Desai", contact: "9876543344", designation: "Village Officer", email: "kiran.desai@village.gov.in" }, 
    farmers: 105, 
    crops: ["Sugarcane", "Wheat"], 
    area: 52000,
    population: 2400,
    households: 440,
    literacyRate: 76,
    mainOccupation: "Agriculture",
    nearestTown: "Gorakhpur (15 km)",
    established: "1946",
    pincode: "226014"
  },
  { 
    name: "Tech Nagar", 
    officer: { name: "Rahul Verma", contact: "9876543355", designation: "Village Officer", email: "rahul.verma@village.gov.in" }, 
    farmers: 120, 
    crops: ["Paddy", "Cotton"], 
    area: 55000,
    population: 2600,
    households: 470,
    literacyRate: 79,
    mainOccupation: "Agriculture",
    nearestTown: "Noida (12 km)",
    established: "1944",
    pincode: "226015"
  }
];


const VillageList = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gray-300 min-h-screen">
      <h2 className="text-responsive-2xl font-bold mb-6 text-green-800">Village List</h2>
      <div className="flex flex-col gap-6 pb-4">
        {villageData.map(village => (
          <div
            key={village.name}
            className="bg-gray-200 shadow-lg rounded-2xl p-6 cursor-pointer  transition-transform flex items-center gap-4 border-2 border-green-300"
            onClick={() => navigate('/village-detail', { state: { village: village } })}
            style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)', borderRadius: '1.5rem' }}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold text-responsive-xl">
              {village.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-responsive-xl font-bold text-green-800 mb-1">{village.name}</h3>
              <p className="text-gray-700 text-responsive-sm">
                Officer: <span className="font-semibold">{village.officer.name}</span>
              </p>
              <p className="text-gray-700 text-responsive-sm">
                Contact: <span className="font-semibold">{village.officer.contact}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VillageList;
