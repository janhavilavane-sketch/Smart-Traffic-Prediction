
import React, { useState, useEffect } from 'react';
import { Icons } from './constants';
import { TrafficStatus, TrafficDataPoint, Route } from './types';
import AssistantChat from './components/AssistantChat';
import TrafficMap from './components/TrafficMap';
import TrafficChart from './components/TrafficChart';

const App: React.FC = () => {
  const [trafficTrend, setTrafficTrend] = useState<TrafficDataPoint[]>([]);
  const [suggestedRoutes, setSuggestedRoutes] = useState<Route[]>([
    { 
      id: '1', 
      name: 'Main Highway (I-95)', 
      status: TrafficStatus.HIGH, 
      duration: '45 mins', 
      distance: '12 miles', 
      reasoning: 'Heavy rush hour congestion near Downtown exit.' 
    },
    { 
      id: '2', 
      name: 'River Road Express', 
      status: TrafficStatus.LOW, 
      duration: '32 mins', 
      distance: '15 miles', 
      reasoning: 'Smooth flow. Recommended for saving time.' 
    },
    { 
      id: '3', 
      name: 'Downtown Boulevard', 
      status: TrafficStatus.MEDIUM, 
      duration: '38 mins', 
      distance: '10 miles', 
      reasoning: 'Moderate traffic due to localized construction.' 
    },
  ]);

  useEffect(() => {
    // Initial mock data
    const mockData: TrafficDataPoint[] = [
      { time: '08:00', congestion: 85, predicted: 80 },
      { time: '10:00', congestion: 45, predicted: 50 },
      { time: '12:00', congestion: 60, predicted: 55 },
      { time: '14:00', congestion: 50, predicted: 60 },
      { time: '16:00', congestion: 90, predicted: 85 },
      { time: '18:00', congestion: 80, predicted: 75 },
    ];
    setTrafficTrend(mockData);
  }, []);

  const getStatusColor = (status: TrafficStatus) => {
    switch (status) {
      case TrafficStatus.HIGH: return 'text-red-600 bg-red-50 border-red-100';
      case TrafficStatus.MEDIUM: return 'text-amber-600 bg-amber-50 border-amber-100';
      case TrafficStatus.LOW: return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar Navigation (Desktop) / Header (Mobile) */}
      <aside className="w-full md:w-20 lg:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-4 flex md:flex-col items-center md:items-stretch gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Icons.Traffic />
          </div>
          <span className="hidden lg:block font-bold text-slate-800 tracking-tight">Smart Traffic</span>
        </div>

        <nav className="flex-1 flex md:flex-col gap-2 md:mt-8">
          <button className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-blue-600 font-semibold transition-all">
            <Icons.Traffic />
            <span className="hidden lg:block text-sm">Dashboard</span>
          </button>
          <button className="flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
            <Icons.Route />
            <span className="hidden lg:block text-sm">My Routes</span>
          </button>
          <button className="flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
            <Icons.Emergency />
            <span className="hidden lg:block text-sm">Alerts</span>
          </button>
        </nav>
        
        <div className="hidden md:block mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">System Status</span>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-tight">AI monitoring active on 14 city sectors.</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen custom-scrollbar">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Traffic Intelligence Hub</h1>
          <p className="text-slate-500 text-sm">Real-time monitoring and predictive route optimization</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Map & Insights */}
          <div className="lg:col-span-8 space-y-6">
            <section>
              <TrafficMap />
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Icons.Route /> Optimal Route Recommendations
                </h2>
                <div className="space-y-3">
                  {suggestedRoutes.map(route => (
                    <div key={route.id} className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all group cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-800 text-sm group-hover:text-blue-600">{route.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(route.status)}`}>
                          {route.status} Traffic
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                        <span className="flex items-center gap-1">🕒 {route.duration}</span>
                        <span className="flex items-center gap-1">📍 {route.distance}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 italic leading-relaxed">{route.reasoning}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <TrafficChart data={trafficTrend} />
                <div className="p-4 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-100 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="font-bold text-sm mb-1">Peak Hour Alert</h3>
                    <p className="text-xs opacity-90 leading-relaxed">Evening rush starts in 45 mins. We recommend starting your journey now to avoid 20% increased delays.</p>
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Icons.Emergency />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Assistant Chat */}
          <div className="lg:col-span-4 h-[calc(100vh-8rem)] sticky top-0">
            <AssistantChat />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
