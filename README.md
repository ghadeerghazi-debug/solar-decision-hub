# 🌞 منظومة الشمس · القرار
## Solar Decision Hub — Imam Al-Sadiq University

تطبيق ويب تفاعلي لمقارنة عروض موردي الطاقة الشمسية باستخدام خوارزمية Fuzzy TOPSIS.

An interactive web application for comparing solar energy vendor offers using the Fuzzy TOPSIS algorithm.

---

## 📁 Project Structure

```
solar-dashboard-project/
├── package.json          ← Dependencies & scripts
├── README.md             ← This file
├── public/
│   └── index.html        ← HTML entry point (RTL Arabic)
└── src/
    ├── index.js          ← React entry point
    ├── index.css         ← Global styles + utility classes
    └── App.js            ← Main dashboard component (the actual app)
```

---

## 🚀 How to Run (3 Easy Steps)

### Prerequisites
You need **Node.js** installed on your computer. Download from: https://nodejs.org (use the LTS version)

### Step 1: Install Dependencies
Open a terminal in this folder and run:
```bash
npm install
```
This will install React, recharts, lucide-react, and all other packages. Takes 2–3 minutes.

### Step 2: Start the Development Server
```bash
npm start
```
The app will automatically open at `http://localhost:3000` in your browser.

### Step 3: Build for Production (Optional)
When you're ready to deploy:
```bash
npm run build
```
This creates an optimized `build/` folder you can host anywhere (Vercel, Netlify, GitHub Pages, your own server).

---

## 🌐 Quick Online Deployment

### Option 1: Vercel (Easiest, Free)
1. Push this folder to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project → Select your repo
3. Click Deploy. Done. You'll get a public URL in 2 minutes.

### Option 2: Netlify (Easy, Free)
1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `build/` folder (after running `npm run build`) onto the page
3. Done. You'll get a public URL instantly.

### Option 3: CodeSandbox (No Installation Needed)
1. Go to [codesandbox.io](https://codesandbox.io) → New Sandbox → React
2. Replace the default files with the contents of this project
3. Add `lucide-react` and `recharts` to dependencies
4. It runs immediately in the browser

---

## 📊 What's Inside

The dashboard has **3 main sections**:

### 1. مقارنة العروض (Vendor Comparison)
- Six vendor cards ranked by Fuzzy TOPSIS score
- Detailed comparison for selected vendors
- Multi-dimensional radar chart (9 criteria)

### 2. مختبر القرار (Decision Lab)
- 9 adjustable weight sliders
- Live ranking recalculation
- Real-time bar chart

### 3. العائد المالي (Financial ROI)
- 5 adjustable financial parameters
- 25-year cumulative savings curve
- Per-vendor financial summary cards
- Environmental impact metrics

---

## 🎨 Design System

- **Theme:** Warm Editorial (cream paper + ink + terracotta accents)
- **Fonts:** Tajawal (body), Amiri (display), Reem Kufi (headings)
- **Direction:** RTL (right-to-left) for Arabic
- **Approach:** Architectural & magazine-inspired aesthetic

---

## 🛠️ Customization

### Change Theme Colors
Edit the `T` object at the top of `src/App.js`:
```javascript
const T = {
  paper: '#F5EFE6',     // Background
  ink: '#1A1611',       // Text
  terracotta: '#B5533C', // Accent
  // ... etc
};
```

### Change Vendor Data
Edit the `VENDORS` array in `src/App.js` to update prices, capacities, or add new vendors.

### Change Weights
Edit the `CRITERIA_LIST` array to adjust default weights for each criterion.

---

## 📞 Support

This dashboard was prepared by Ghadeer for Prof. Dr. Kalus.
Methodology: Fuzzy TOPSIS with Triangular Fuzzy Numbers.
6 Alternatives × 9 Criteria.

---

## 📜 License

Internal use for Imam Al-Sadiq University vendor selection project.
