cat > README.md <<'E
# Real-Time Analytics Dashboard
A powerful, interactive analytics dashboard built with React, D3.js, and WebSocket connections for real-time data visualization.

## Features

### 🔴 Real-Time Data Streaming
- WebSocket connection manager with auto-reconnect
- Live connection status indicator
- Real-time metric updates every 2 seconds
- Animated counter increments and sparklines

### 📊 Interactive Visualizations
- **Line Chart**: Time-series data with smooth curves and area fill
- **Bar Chart**: Weekly performance with animated bars
- **Donut Chart**: Traffic distribution by device with legend
- **Heat Map**: Activity patterns by day and hour

### 📈 Metric Cards
- 4 KPI cards: Active Users, Revenue, Conversions, Bounce Rate
- Live indicators with pulsing animation
- Sparkline trends (20 data points)
- Percentage change indicators with color coding

### Data Table
- Search functionality across all columns
- Sortable columns with visual indicators
- Pagination (10 rows per page)
- CSV export functionality
- Status badges with color coding

### Design System
- Dark theme: #1a1d29 background, #2d3142 cards
- Accent colors: #00d9ff (primary), #7c3aed (secondary)
- Glassmorphism effects with backdrop-blur
- Smooth transitions (500ms ease)
- Responsive grid layout (12-column system)

### User Interface
- Top navigation with user profile, notifications, settings
- Time range selector (1h, 24h, 7d, 30d, Custom)
- Connection status monitoring
- User dropdown menu
- Notification bell with badge counter

## Technology Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **D3.js v7** - Data visualizations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

## Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
