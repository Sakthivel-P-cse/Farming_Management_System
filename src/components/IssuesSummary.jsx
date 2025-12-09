import React from 'react';
import TopCropsList from './TopCropsList';
import MostAffectedFarmerCard from './MostAffectedFarmerCard';
import EquipmentDamagesTable from './EquipmentDamagesTable';
import { getTopAffectedCrops, getMostAffectedFarmer, getAllEquipmentDamages } from '../utils/issueUtils';

const IssuesSummary = ({ farmersData }) => {
  // Process data using utility functions - extract farmers array from mock data object
  const farmers = farmersData.farmers || farmersData;
  
  // Debug logging
  console.log('IssuesSummary received farmersData:', farmersData);
  console.log('Extracted farmers array:', farmers);
  
  const topCrops = getTopAffectedCrops(farmers);
  const mostAffectedFarmer = getMostAffectedFarmer(farmers);
  const equipmentDamages = getAllEquipmentDamages(farmers);
  
  console.log('Calculated topCrops:', topCrops);
  console.log('Calculated mostAffectedFarmer:', mostAffectedFarmer);
  console.log('Calculated equipmentDamages:', equipmentDamages);

  return (
    <div className="space-y-6">
      {/* Top Section: Most Affected Farmer + Top Crops */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Affected Farmer - Left Column */}
        <MostAffectedFarmerCard farmerData={mostAffectedFarmer} />
        
        {/* Top Affected Crops - Right Column */}
        <TopCropsList cropsData={topCrops} />
      </div>

      {/* Bottom Section: Equipment Damages Table - Full Width */}
      <EquipmentDamagesTable equipmentData={equipmentDamages} />
    </div>
  );
};

export default IssuesSummary;
