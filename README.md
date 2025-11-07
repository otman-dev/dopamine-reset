# Dopamine Reset Tracker - 14-Day Cigarette Withdrawal Program

A Next.js web application designed to help cigarette smokers track their 14-day dopamine reset journey with automatic progress tracking, phase-specific guidance, and hourly reminders.

## Features

✅ **One-Click Start** - Single button to begin the 14-day program  
✅ **Automatic Tracking** - Day and hour progress updates automatically based on system time  
✅ **Phase-Specific Guidance** - 4 distinct phases with tailored side-effects and messages  
✅ **Hourly Reminders** - Time-based motivational messages throughout the day  
✅ **Progress Visualization** - Dual progress bars for daily and overall completion  
✅ **Persistent Storage** - Progress saved locally, continues even after closing the app  
✅ **Identity Reinforcement** - Consistent reminders: "I don't smoke. That chapter is closed."  
✅ **Mobile-First Design** - Optimized for all screen sizes with Tailwind CSS  

## Program Phases

- **Phase 1 - Withdrawal (Days 1-3)**: Intense cravings, restlessness, anxiety
- **Phase 2 - Mental Fog (Days 4-7)**: Low motivation, brain fog, mood swings
- **Phase 3 - Clarity (Days 8-10)**: Energy returns, clearer thinking, minimal cravings
- **Phase 4 - Identity Rebuild (Days 11-14)**: Confidence, stability, non-smoker identity

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment on Vercel

### Quick Deploy

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Setup

Add your MongoDB connection string to Vercel:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add: `MONGODB_URI` with your MongoDB connection string
4. The app will automatically sync progress across devices

## Project Structure

```
├── pages/
│   ├── _app.js          # App wrapper with global styles
│   └── index.js         # Main tracker component
├── styles/
│   └── globals.css      # Tailwind CSS globals
├── phaseData.js         # 14-day program data with hourly messages
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## How It Works

1. **Start Button**: User clicks "Start 14-Day Reset" to begin
2. **Automatic Tracking**: 
   - Start date saved to localStorage
   - Current day calculated from elapsed time since start
   - Current hour pulled from system time
3. **Real-Time Updates**: Component updates every minute to refresh progress
4. **Phase Display**: Shows current phase, side-effects, and hourly guidance
5. **Progress Bars**: Visual feedback for daily (hours/24) and overall (days/14) progress

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **Tailwind CSS 3** - Styling
- **LocalStorage** - Data persistence

## Customization

### Modify Phase Data

Edit `phaseData.js` to customize:
- Daily side-effects
- Hourly messages
- Phase names and descriptions

### Styling

Modify `tailwind.config.js` and `styles/globals.css` to customize:
- Color schemes
- Font sizes
- Layout spacing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Requires JavaScript and localStorage enabled.

## License

This project is open source and available for personal use.

## Support

For issues or questions, please open an issue in the repository.

---

**Remember**: I don't smoke. That chapter is closed. 🚭
# dopamine-reset
