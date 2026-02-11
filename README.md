# 🛡️ Phoenix Vault - Ultimate Savings DApp

This DApp allows users to set a savings goal, deposit ADA, and locks funds until the target is reached.

## 🚀 Deployment Instructions for Vercel
1. Create a **new GitHub repository** (e.g., `phoenix-vault`).
2. **Download and Extract** this ZIP file.
3. **Upload all files** inside the extracted folder directly to your GitHub repo.
   - **Important**: Files like `package.json` and `next.config.js` MUST be in the root directory.
4. Go to **Vercel**, click **Add New Project**, and import your repo.
5. Vercel will auto-detect Next.js. **Click Deploy**.

## 🏗️ Architecture
- **On-Chain**: `contracts/PhoenixVault.hs` (Plutus V2 Smart Contract).
- **Off-Chain**: `src/app/page.js` (Next.js logic using Mesh SDK for wallet interaction).
