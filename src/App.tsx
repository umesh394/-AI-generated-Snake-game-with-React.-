import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Terminal, Database, Activity, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-black text-cyan-400 flex flex-col relative tear-container">
      {/* Glitch Overlay Elements */}
      <div className="scanline" />
      <div className="fixed inset-0 noise-panel" />
      
      {/* Decorative Glitch Bars */}
      <div className="fixed top-0 left-0 w-full h-1 bg-magenta-500 opacity-20 animate-pulse" />
      <div className="fixed bottom-0 left-0 w-full h-1 bg-cyan-500 opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }} />

      {/* Cryptic Header */}
      <header className="relative z-10 p-4 flex items-center justify-between border-b-4 border-cyan-400 bg-black">
        <div className="flex items-center gap-4 tear-effect">
          <div className="w-12 h-12 bg-magenta-500 flex items-center justify-center shadow-[4px_4px_0_#ffff00]">
            <Terminal className="text-black w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-pixel glitch-text tracking-tighter text-white">
              SNAKE_OS.EXE
            </h1>
            <p className="text-[8px] font-mono text-magenta-500 tracking-tighter uppercase">
              KERNEL_VERSION: 0xDEADBEEF // AUTH: ADMIN
            </p>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-mono text-cyan-800 uppercase">[ACCUMULATED_DEBT]</span>
            <span className="text-2xl font-pixel text-yellow-400 glitch-text">
              {score.toString().padStart(6, '0')}
            </span>
          </div>
          <div className="hidden md:block">
            <div className="px-4 py-2 border-2 border-magenta-500 text-[10px] font-pixel bg-magenta-500/10 text-white animate-pulse">
              THREAT_LEVEL: OMEGA
            </div>
          </div>
        </div>
      </header>

      {/* Main Command Center */}
      <main className="flex-1 relative z-10 container mx-auto p-4 md:p-8 grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        
        {/* Sub-System: Audio Extraction */}
        <section className="xl:col-span-4 order-2 xl:order-1 space-y-8">
          <div className="flex items-center gap-2 text-[10px] font-pixel text-white uppercase bg-cyan-900/50 p-2 border-l-4 border-cyan-400">
            <Database className="w-4 h-4" />
            AUDIO_BUFFER_01
          </div>
          <MusicPlayer />
          
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-black border-2 border-dashed border-cyan-900 space-y-2">
              <div className="flex items-center justify-between">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span className="text-[8px] font-mono text-cyan-800">Uptime: 99.99%</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-600 uppercase tracking-tighter">SIGNAL_INTEGRITY</div>
              <div className="w-full bg-cyan-950 h-2">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "94%" }}
                  className="h-full bg-cyan-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sub-System: Visual Simulation */}
        <section className="xl:col-span-8 order-1 xl:order-2 flex flex-col items-center">
          <div className="w-full max-w-[500px] lg:max-w-none flex flex-col items-center space-y-8">
            <div className="w-full flex items-center justify-between text-[10px] font-mono text-magenta-500 uppercase px-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 animate-bounce" />
                DANGER: MEMORY_CORRUPTION_DETECTED
              </div>
              <div className="hidden sm:block">
                SYS_CLK: {new Date().toLocaleTimeString()}
              </div>
            </div>
            
            <div className="relative">
               <div className="absolute -inset-4 border border-magenta-500/30 -z-10 animate-pulse" />
               <SnakeGame onScoreChange={setScore} />
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <div className="p-6 bg-black border-4 border-cyan-400 shadow-[8px_8px_0_#ffff00]">
                <h4 className="text-[10px] font-pixel text-white uppercase mb-6">MANUAL_OVERRIDE</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-cyan-700">VECTOR_SHIFT</span>
                    <span className="text-white bg-cyan-900 px-2 font-pixel">KEYS</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-cyan-700">TERMINATE_LINK</span>
                    <span className="text-white bg-magenta-900 px-2 font-pixel">ESC</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-black border-4 border-magenta-500 shadow-[8px_8px_0_#00ffff] flex flex-col justify-center overflow-hidden">
                <div className="mb-4">
                   <h4 className="text-[10px] font-pixel text-white uppercase">OS_LOGS</h4>
                </div>
                <div className="text-[8px] font-mono text-magenta-300 space-y-1">
                  <div>{`> INITIALIZING_PHASE_4...`}</div>
                  <div>{`> BYPASSING_SECURITY_ARRAY...`}</div>
                  <div className="animate-pulse">{`> [!] WARNING: ENTRPY_MAX`}</div>
                  <div className="text-cyan-400">{`> LINK_STABLE_001`}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Terminal Footer */}
      <footer className="relative z-10 p-6 bg-cyan-400 text-black flex flex-col sm:flex-row items-center justify-between gap-4 text-[8px] font-pixel">
        <div className="flex items-center gap-8">
          <span className="glitch-text">VOID_RECLAMATION_SERVICES</span>
          <span className="hidden sm:inline opacity-30">//</span>
          <span>EST_199X</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="underline decoration-black decoration-2">GET_LOGS</span>
          <span className="underline decoration-black decoration-2">PURGE_MEM</span>
          <div className="w-4 h-4 bg-black animate-ping" />
        </div>
      </footer>
    </div>
  );
};

export default App;
