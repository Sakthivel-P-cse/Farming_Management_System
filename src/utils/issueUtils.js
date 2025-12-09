// Utility functions for Issues dashboard calculations
import { subsidyConfig } from '../data/issuesMock';

/**
 * Calculate subsidy for crop loss based on severity and crop type
 * Formula: subsidy = min(coveragePercentage * estimatedLoss, capByCrop)
 */
export const calculateSubsidyForCropLoss = (damage) => {
  const { cropName, severity, estimatedLoss } = damage;
  
  // Get severity factor (coverage percentage)
  const coveragePercentage = subsidyConfig.severityFactors[severity] || 0.5;
  
  // Get crop-specific cap
  const cropCap = subsidyConfig.cropCaps[cropName] || 5000;
  
  // Calculate subsidy
  const calculatedSubsidy = coveragePercentage * estimatedLoss;
  const finalSubsidy = Math.min(calculatedSubsidy, cropCap);
  
  return Math.round(finalSubsidy);
};

/**
 * Calculate subsidy for equipment damage
 * Formula: subsidy = min(estimatedRepairCost * 0.75, equipmentCap)
 */
export const calculateSubsidyForEquipment = (equipmentDamage) => {
  const { equipmentType, estimatedRepairCost } = equipmentDamage;
  
  // Get equipment-specific cap
  const equipmentCap = subsidyConfig.equipmentCaps[equipmentType] || 5000;
  
  // Calculate subsidy (75% of repair cost)
  const calculatedSubsidy = estimatedRepairCost * subsidyConfig.equipmentCoverageRate;
  const finalSubsidy = Math.min(calculatedSubsidy, equipmentCap);
  
  return Math.round(finalSubsidy);
};

/**
 * Get top affected crops ranked by total damage
 * Returns: Array of { cropName, farmCount, totalAreaAffected, totalLoss, rank }
 */
export const getTopAffectedCrops = (farmersData) => {
  const cropMap = new Map();
  
  farmersData.forEach(farmer => {
    farmer.damages.forEach(damage => {
      if (damage.type === 'crop') {
        const cropName = damage.cropName;
        
        if (!cropMap.has(cropName)) {
          cropMap.set(cropName, {
            cropName,
            farmCount: new Set(),
            totalAreaAffected: 0,
            totalLoss: 0,
            farms: []
          });
        }
        
        const cropData = cropMap.get(cropName);
        cropData.farmCount.add(farmer.id);
        cropData.totalAreaAffected += damage.areaAffected;
        cropData.totalLoss += damage.estimatedLoss;
        cropData.farms.push({
          farmerId: farmer.id,
          farmerName: farmer.name,
          areaAffected: damage.areaAffected,
          loss: damage.estimatedLoss,
          severity: damage.severity
        });
      }
    });
  });
  
  // Convert to array and add farm count
  const cropsArray = Array.from(cropMap.values()).map(crop => ({
    ...crop,
    farmCount: crop.farmCount.size
  }));
  
  // Sort by total loss (descending)
  cropsArray.sort((a, b) => b.totalLoss - a.totalLoss);
  
  // Add rank
  return cropsArray.map((crop, index) => ({
    ...crop,
    rank: index + 1
  }));
};

/**
 * Get the most affected farmer based on total estimated damage
 * Returns: { farmer, totalDamage, totalSubsidy, damageBreakdown }
 */
export const getMostAffectedFarmer = (farmersData) => {
  let mostAffected = null;
  let maxDamage = 0;
  
  farmersData.forEach(farmer => {
    let totalDamage = 0;
    let totalSubsidy = 0;
    const damageBreakdown = {
      cropLosses: [],
      equipmentDamages: []
    };
    
    farmer.damages.forEach(damage => {
      if (damage.type === 'crop') {
        const subsidy = calculateSubsidyForCropLoss(damage);
        totalDamage += damage.estimatedLoss;
        totalSubsidy += subsidy;
        damageBreakdown.cropLosses.push({
          ...damage,
          subsidy
        });
      } else if (damage.type === 'equipment') {
        const subsidy = calculateSubsidyForEquipment(damage);
        totalDamage += damage.estimatedRepairCost;
        totalSubsidy += subsidy;
        damageBreakdown.equipmentDamages.push({
          ...damage,
          subsidy
        });
      }
    });
    
    if (totalDamage > maxDamage) {
      maxDamage = totalDamage;
      mostAffected = {
        farmer,
        totalDamage,
        totalSubsidy,
        damageBreakdown
      };
    }
  });
  
  return mostAffected;
};

/**
 * Get all equipment damages across all farmers
 * Returns: Array of equipment damages with farmer info and subsidy
 */
export const getAllEquipmentDamages = (farmersData) => {
  const equipmentDamages = [];
  
  farmersData.forEach(farmer => {
    farmer.damages.forEach(damage => {
      if (damage.type === 'equipment') {
        const subsidy = calculateSubsidyForEquipment(damage);
        equipmentDamages.push({
          ...damage,
          farmerId: farmer.id,
          farmerName: farmer.name,
          village: farmer.village,
          subsidy
        });
      }
    });
  });
  
  return equipmentDamages;
};

/**
 * Format currency in INR
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Export table data to CSV
 */
export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) return;
  
  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  let csv = headers.join(',') + '\n';
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      // Escape commas and quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csv += values.join(',') + '\n';
  });
  
  // Create blob and download
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
