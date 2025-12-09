# Issues Dashboard - Feature Documentation

## Overview
The Issues Dashboard has been enhanced with comprehensive crop damage and equipment damage tracking, including automated subsidy calculations for village officers.

## New Features

### 1. Most Affected Farmer Card
**Component:** `src/components/MostAffectedFarmerCard.jsx`

**Features:**
- Displays the farmer with the highest total damage (crops + equipment)
- Shows total estimated damage and estimated subsidy
- Priority badge for high-risk cases
- Detailed modal with complete damage breakdown:
  - Crop losses with severity, area, and subsidy
  - Equipment damages with repair costs and subsidy
  - Calculation methodology explanation

**Data Source:** Automatically identifies the most affected farmer using `getMostAffectedFarmer()` utility

---

### 2. Top Affected Crops List
**Component:** `src/components/TopCropsList.jsx`

**Features:**
- Ranked list of top 5 most damaged crops
- Visual bar chart showing relative impact
- Highlights #1 crop with "MOST AFFECTED" badge
- Full table view with:
  - Rank, crop name, number of farms affected
  - Total area affected (hectares)
  - Total estimated loss
- "View Farms" drill-down to see all affected farms per crop
- Farm detail modal showing farmer info, area, loss, and severity

**Data Source:** Aggregates crop damages using `getTopAffectedCrops()` utility

---

### 3. Equipment Damages Table
**Component:** `src/components/EquipmentDamagesTable.jsx`

**Features:**
- Comprehensive table of all equipment damages across farms
- **Sorting capabilities:**
  - By subsidy amount (default)
  - By repair cost
  - By farmer name
  - Ascending/Descending toggle
- **Filtering:**
  - By status (All, Pending, Verified)
- **Summary cards:**
  - Total equipment damages count
  - Total repair cost (red)
  - Total subsidy estimate (green)
- **CSV Export:** Download equipment damage report
- Status badges (Yellow for Pending, Green for Verified)

**Data Source:** Flattens all equipment damages using `getAllEquipmentDamages()` utility

---

## Subsidy Calculation System

### Crop Loss Subsidy
```
subsidy = min(severityFactor × estimatedLoss, cropCap)

Severity Factors:
- Low: 30% (0.3)
- Medium: 60% (0.6)
- High: 90% (0.9)

Crop-specific caps:
- Paddy: ₹10,000
- Wheat: ₹8,000
- Cotton: ₹9,000
- Sugarcane: ₹12,000
- Corn: ₹7,000
```

### Equipment Damage Subsidy
```
subsidy = min(repairCost × 0.75, equipmentCap)

Coverage: 75% of repair/replacement cost

Equipment-specific caps:
- Tractor: ₹20,000
- Harvester: ₹25,000
- Sprayer: ₹5,000
- Pump: ₹8,000
- Other: ₹10,000
```

---

## File Structure

### New Files Created
1. **Data Layer:**
   - `src/data/issuesMock.js` - Mock dataset with 6 farmers and comprehensive damage records

2. **Utilities:**
   - `src/utils/issueUtils.js` - Calculation functions for subsidies, rankings, aggregations, and CSV export

3. **Components:**
   - `src/components/TopCropsList.jsx` - Ranked crops display
   - `src/components/MostAffectedFarmerCard.jsx` - Most affected farmer display
   - `src/components/EquipmentDamagesTable.jsx` - Equipment damages table
   - `src/components/IssuesSummary.jsx` - Wrapper component integrating all three

4. **Modified:**
   - `src/pages/villageofficer/VillageIssue.jsx` - Integrated new dashboard at top of page

---

## Mock Data Structure

### Sample Farmer Entry
```javascript
{
  id: 1,
  name: "Sunita Devi",
  village: "Rampur",
  contact: "+91 9876543210",
  cropsGrown: ["Paddy", "Sugarcane"],
  totalAreaOwned: 6,
  damages: [
    {
      type: "crop",
      cropName: "Paddy",
      areaAffected: 4,
      severity: "High",
      estimatedLoss: 52000,
      description: "Severe flooding damage"
    },
    {
      type: "equipment",
      equipmentType: "Harvester",
      estimatedRepairCost: 35000,
      description: "Engine damage due to waterlogging",
      status: "Pending"
    }
  ]
}
```

---

## Integration Points

### Current Implementation
- Uses **mock data** from `src/data/issuesMock.js`
- All calculations happen **client-side**
- Component shows in VillageIssue.jsx page

### Backend Integration (TODO)
Replace mock data with API calls:

```javascript
// In IssuesSummary.jsx or VillageIssue.jsx
useEffect(() => {
  // Fetch real farmers damage data from backend
  fetch('/api/village/damages')
    .then(res => res.json())
    .then(data => setFarmersData(data));
}, []);
```

**API Endpoint Requirements:**
- `GET /api/village/damages` - Return array of farmers with damage records
- Expected format: Same structure as `mockIssuesData`

**Subsidy Configuration:**
- Move `subsidyConfig` from `issuesMock.js` to backend
- Create admin panel to update caps and factors
- Fetch config on component mount: `GET /api/config/subsidies`

---

## User Workflow

1. **Village Officer logs in** → Navigates to Issues page
2. **Views Dashboard Summary:**
   - Sees most affected farmer immediately
   - Reviews top damaged crops
   - Scans equipment damages table
3. **Drills into details:**
   - Clicks "View Detailed Breakdown" on farmer card
   - Clicks "View Farms" on crops list
   - Filters/sorts equipment table
4. **Exports data:**
   - Clicks "Export CSV" button
   - Downloads equipment damage report for records

---

## Styling Theme
All components follow the established **mild green and gray theme**:
- **Backgrounds:** White cards on gray-200 page
- **Borders:** gray-300 borders
- **Accents:** green-500, green-600, green-700
- **Status colors:** Red (pending/damage), Yellow (in-progress), Green (resolved/verified)
- **Typography:** Bold headers, medium body text, clean hierarchy

---

## Accessibility Features
- **Keyboard navigation:** All modals support ESC to close
- **Click-outside-to-close:** Modals close when clicking backdrop
- **Focus management:** Close buttons are keyboard accessible
- **Semantic HTML:** Proper heading hierarchy, table structure
- **ARIA labels:** (Can be enhanced - see TODO below)

---

## Future Enhancements (TODO)

### High Priority
- [ ] Connect to real backend API
- [ ] Add loading states for API calls
- [ ] Error handling for failed data fetches
- [ ] Add authentication checks

### Medium Priority
- [ ] Mobile responsive testing and refinements
- [ ] Print-friendly view for reports
- [ ] Batch status update for equipment damages
- [ ] Photo upload for damage evidence
- [ ] Farmer signature/approval workflow

### Low Priority
- [ ] Enhanced ARIA labels for screen readers
- [ ] Dark mode support
- [ ] Advanced filtering (date range, damage amount)
- [ ] Data visualization charts (trends over time)
- [ ] Email/SMS notifications for high-priority cases

---

## Testing Checklist

### Functionality
- [x] Most affected farmer card displays correct data
- [x] Top crops list shows correct ranking
- [x] Equipment table sorting works (subsidy, cost, farmer)
- [x] Status filtering works (All, Pending, Verified)
- [x] CSV export generates correct file
- [x] Modals open and close properly

### UI/UX
- [x] Styling matches existing theme
- [x] Components are responsive (desktop)
- [ ] Components are responsive (mobile/tablet) - TODO
- [x] No layout shift on data load
- [x] Text is readable and accessible

### Data Integrity
- [x] Subsidy calculations are correct
- [x] Crop ranking logic works
- [x] Most affected farmer calculation works
- [x] Currency formatting is consistent

---

## Component Dependencies

```
VillageIssue.jsx
  └─ IssuesSummary.jsx
       ├─ MostAffectedFarmerCard.jsx
       │    └─ utils/issueUtils.js (formatCurrency, getMostAffectedFarmer)
       ├─ TopCropsList.jsx
       │    └─ utils/issueUtils.js (formatCurrency, getTopAffectedCrops)
       └─ EquipmentDamagesTable.jsx
            └─ utils/issueUtils.js (formatCurrency, exportToCSV)
```

---

## Contact & Support
For questions or issues with the Issues Dashboard:
- Review mock data in `src/data/issuesMock.js`
- Check calculation logic in `src/utils/issueUtils.js`
- Verify component integration in `src/pages/villageofficer/VillageIssue.jsx`

**Last Updated:** 2024
**Version:** 1.0
**Status:** Complete (Frontend with Mock Data)
