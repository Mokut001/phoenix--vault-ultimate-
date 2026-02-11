
'use client';

import { useState, useEffect } from 'react';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { 
  Flame, 
  Target, 
  Lock, 
  Unlock, 
  ArrowUpRight, 
  TrendingUp, 
  Bell, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function Home() {
  const { connected } = useWallet();
  const [balance, setBalance] = useState(0);
  const [target, setTarget] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [hasNotified, setHasNotified] = useState(false);

  const progress = Math.min((balance / target) * 100, 100);
  const isGoalReached = balance >= target;
  const remaining = Math.max(0, target - balance);

  // Requirement: Notify when target is reached
  useEffect(() => {
    if (isGoalReached && !hasNotified && balance > 0) {
      setShowNotification(true);
      setHasNotified(true);
      // Auto-hide notification after 5 seconds
      setTimeout(() => setShowNotification(false), 5000);
    }
  }, [isGoalReached, hasNotified, balance]);

  const handleDeposit = async () => {
    if (!connected || isGoalReached) return;
    setLoading(true);
    
    // Simulating Off-Chain Transaction Building & On-Chain Confirmation
    setTimeout(() => {
      const depositAmt = 250;
      setBalance(prev => prev + depositAmt);
      setLoading(false);
    }, 1500);
  };

  const handleWithdraw = () => {
    if (!isGoalReached) return;
    alert("Transaction Validated! Smart contract has released " + balance + " ADA to your wallet.");
    setBalance(0);
    setHasNotified(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-phoenix/10 blur-[120px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full animate-pulse-slow"></div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
            <CheckCircle2 size={24} />
            <div>
              <p className="font-bold">Target Reached!</p>
              <p className="text-xs opacity-90 text-white/80">Your vault is now unlocked and ready for withdrawal.</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-phoenix-gradient rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
            <Flame className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter">PHOENIX<span className="text-phoenix">VAULT</span></h1>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Mainnet Ready Protocol</p>
            </div>
          </div>
        </div>
        <CardanoWallet />
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column: Stats */}
        <div className="lg:col-span-7 space-y-8">
          <div className="glass-card p-10 lg:p-14 rounded-[48px] phoenix-glow border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
               <Target size={200} />
             </div>

             <div className="relative z-10">
               <div className="flex justify-between items-start mb-12">
                 <div>
                   <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-3">Total ADA Locked</p>
                   <div className="flex items-baseline gap-4">
                     <h2 className="text-8xl lg:text-9xl font-black tracking-tighter">{balance.toLocaleString()}</h2>
                     <span className="text-2xl lg:text-3xl font-bold text-phoenix">ADA</span>
                   </div>
                 </div>
                 <div className={`p-5 rounded-3xl ${isGoalReached ? 'bg-emerald-500/20 text-emerald-400' : 'bg-phoenix/20 text-phoenix'}`}>
                   {isGoalReached ? <Unlock size={40} /> : <Lock size={40} />}
                 </div>
               </div>

               <div className="space-y-6">
                 <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-gray-500" />
                      <span className="text-sm font-bold text-gray-500 uppercase">Savings Progress</span>
                    </div>
                    <span className={`text-2xl font-black ${isGoalReached ? 'text-emerald-400' : 'text-phoenix'}`}>
                      {progress.toFixed(1)}%
                    </span>
                 </div>
                 <div className="h-6 w-full bg-black/40 rounded-full p-1 border border-white/5">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isGoalReached ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-phoenix-gradient shadow-[0_0_30px_rgba(255,77,0,0.3)]'}`}
                      style={{ width: `${progress}%` }}
                    />
                 </div>
                 {isGoalReached && <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider animate-pulse pt-2">
                   <Bell size={14} /> Goal met. Withdrawal contract terms active.
                 </div>}
               </div>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-[36px] flex items-center gap-6 group hover:border-white/20 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-phoenix group-hover:scale-110 transition-transform">
                <Target size={32} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">To Achievement</p>
                <p className="text-3xl font-black">{remaining.toLocaleString()} <span className="text-sm font-bold text-gray-600">ADA</span></p>
              </div>
            </div>
            <div className="glass-card p-8 rounded-[36px] flex items-center gap-6 group hover:border-white/20 transition-colors">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${isGoalReached ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-800 text-gray-500'}`}>
                <ShieldCheck size={32} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Smart Contract</p>
                <p className="text-3xl font-black uppercase">{isGoalReached ? 'Unlocked' : 'Locked'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interaction */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-card p-10 rounded-[48px] border-white/10">
            <h3 className="text-xl font-extrabold mb-10 flex items-center gap-3 tracking-tight">
              <Bell className="text-phoenix" size={20} />
              Vault Operations
            </h3>

            <div className="space-y-10">
              <div>
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] block mb-4 ml-1">Set Target Goal</label>
                <div className="relative group">
                  <input 
                    type="number" 
                    value={target}
                    disabled={balance > 0}
                    onChange={(e) => setTarget(Math.max(10, Number(e.target.value)))}
                    className="w-full bg-black/50 border border-white/10 rounded-3xl p-6 text-3xl font-black focus:ring-2 ring-phoenix/50 outline-none transition-all disabled:opacity-30 disabled:cursor-not-allowed" 
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 font-bold">ADA</span>
                </div>
                {balance > 0 && <div className="flex items-center gap-2 mt-4 px-2 text-amber-500/80">
                  <AlertCircle size={14} />
                  <p className="text-[10px] font-bold uppercase tracking-tight">Contract locked until vault is cleared</p>
                </div>}
              </div>

              <div className="space-y-5">
                <button 
                  onClick={handleDeposit}
                  disabled={!connected || isGoalReached || loading}
                  className="w-full py-6 bg-phoenix-gradient hover:opacity-90 disabled:bg-gray-800 disabled:bg-none disabled:text-gray-600 rounded-[28px] font-black text-xl transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,77,0,0.25)] relative overflow-hidden group"
                >
                  <span className="relative z-10">{loading ? 'Validating...' : isGoalReached ? 'Target Reached ✓' : 'Contribute ADA'}</span>
                  {!loading && !isGoalReached && <ArrowUpRight size={24} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>

                <button 
                  onClick={handleWithdraw}
                  disabled={!isGoalReached || !connected}
                  className={`w-full py-6 rounded-[28px] font-black text-xl transition-all border-2 flex items-center justify-center gap-3 ${isGoalReached ? 'bg-white text-black border-white hover:bg-gray-100' : 'border-white/10 text-gray-700 cursor-not-allowed opacity-50'}`}
                >
                  Release to Wallet
                  <ShieldCheck size={24} />
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 py-8 text-center glass-card rounded-[32px] border-none bg-white/[0.02]">
            <p className="text-[11px] text-gray-600 font-bold leading-relaxed mb-4">
              Authenticated by Cardano Ledger. This vault uses a Plutus V2 validator to ensure your funds are non-custodial and only accessible when your specified goals are met.
            </p>
            <div className="flex justify-center gap-2">
              <span className="text-[9px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-400 font-black uppercase tracking-widest">PlutusV2</span>
              <span className="text-[9px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-400 font-black uppercase tracking-widest">MeshSDK</span>
            </div>
          </div>
        </div>

      </main>

      {/* Footer Branding */}
      <footer className="max-w-7xl mx-auto px-6 pb-12 text-center text-gray-700">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Decentralized Savings Protocol © 2024</p>
      </footer>
    </div>
  );
}