// Mock WebSocket service for real-time data simulation
export interface MetricData {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: number[];
}

export interface ChartDataPoint {
  timestamp: number;
  value: number;
  label?: string;
}

class WebSocketService {
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private intervals: NodeJS.Timeout[] = [];
  private connected: boolean = false;

  connect() {
    this.connected = true;
    this.startDataStreams();
  }

  disconnect() {
    this.connected = false;
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
  }

  isConnected() {
    return this.connected;
  }

  subscribe(event: string, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  unsubscribe(event: string, callback: (data: any) => void) {
    this.listeners.get(event)?.delete(callback);
  }

  private emit(event: string, data: any) {
    this.listeners.get(event)?.forEach(callback => callback(data));
  }

  private startDataStreams() {
    // Emit metrics every 2 seconds
    const metricsInterval = setInterval(() => {
      const metrics: MetricData[] = [
        {
          id: 'users',
          label: 'Active Users',
          value: Math.floor(15000 + Math.random() * 5000),
          change: (Math.random() - 0.5) * 10,
          trend: Array(20).fill(0).map(() => Math.random() * 100)
        },
        {
          id: 'revenue',
          label: 'Revenue',
          value: Math.floor(125000 + Math.random() * 25000),
          change: (Math.random() - 0.3) * 15,
          trend: Array(20).fill(0).map(() => Math.random() * 100)
        },
        {
          id: 'conversions',
          label: 'Conversions',
          value: Math.floor(850 + Math.random() * 150),
          change: (Math.random() - 0.4) * 20,
          trend: Array(20).fill(0).map(() => Math.random() * 100)
        },
        {
          id: 'bounce',
          label: 'Bounce Rate',
          value: Math.floor(35 + Math.random() * 10),
          change: (Math.random() - 0.6) * 8,
          trend: Array(20).fill(0).map(() => Math.random() * 100)
        }
      ];
      this.emit('metrics', metrics);
    }, 2000);

    this.intervals.push(metricsInterval);
  }
}

export const wsService = new WebSocketService();
