# Demo District Officer Credentials

**⚠️ FOR TESTING/DEMO PURPOSES ONLY - DO NOT USE IN PRODUCTION**

## District Officers Sign-In

| Email | Password | Name | District |
|-------|----------|------|----------|
| district@example.com | Demo@1234 | Arun Krishnan | Central District |
| district2@example.com | Demo@2345 | Meera Sharma | North District |
| district3@example.com | Demo@3456 | Vijay Reddy | South District |
| district4@example.com | Demo@4567 | Sunita Patel | East District |
| district5@example.com | Demo@5678 | Rajan Nair | West District |
| demo.district@glytch.local | Demo@9999 | Demo District Officer | Demo District |

## Setup Instructions

1. **Sign Up**: Go to the app's registration/login page
2. **Create Account**: Use one of the emails above with the corresponding password
3. **Seed Database**: After registration, run the seed script to populate Firestore with demo data:
   ```bash
   cd /home/sakthi/Desktop/vit/GLYTCH_Farming
   node -e "import('./src/firebase/seedData.js').then(m => m.seedDatabase())"
   ```
4. **Login**: Use your email and password to access the district officer dashboard

## Demo Data

Once seeded, you'll have:
- **5 Villages**: Rampur, Lakshmi Nagar, Shanti Puram, Green Valley, Rose Colony
- **56 Farmers**: Distributed across villages with realistic farm sizes (sqft & acres)
- **33 Dealers**: Equipment & supply dealers per village
- **9 Godowns**: Storage facilities per village
- **8 Issues**: Pending, In Progress, and Resolved issues per village

## Total Farming Area

- **234,000 sqft** (~5.37 acres) across all villages

---

**Note**: These are demo credentials. In production, use proper authentication and never hardcode passwords.
