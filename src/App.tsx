/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Gauge, 
  LayoutDashboard, 
  Target, 
  UserCircle, 
  Bell, 
  TrendingUp, 
  Fuel, 
  Car, 
  Navigation, 
  Star, 
  ChevronRight, 
  Plus, 
  X, 
  LogOut,
  Mail,
  Lock,
  Eye,
  ArrowRight,
  Zap,
  Award,
  ReceiptText,
  Gem,
  History,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { cn } from './lib/utils';
import { MOCK_TRANSACTIONS, MOCK_GOALS, MOCK_STATS } from './constants';
import { Transaction, Goal, DailyStat } from './types';

// --- Components ---

const TopAppBar = ({ onLogout }: { onLogout: () => void }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <header className="fixed top-0 left-0 z-50 flex justify-between items-center w-full px-6 h-16 bg-background/80 backdrop-blur-md border-b border-on-surface-variant/5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-surface-container-highest ring-1 ring-primary/20 flex items-center justify-center">
          <Car className="text-primary w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-black text-on-surface tracking-tight font-headline leading-none">Gestão de Corrida</span>
          <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mt-1">
            {formattedDate} • {formattedTime}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface/60 hover:bg-surface-container-highest transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button 
          onClick={onLogout}
          className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface/60 hover:bg-surface-container-highest transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

const BottomNavBar = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => {
  const tabs = [
    { id: 'home', label: 'Início', icon: Gauge },
    { id: 'history', label: 'Histórico', icon: History },
    { id: 'stats', label: 'Estatísticas', icon: LayoutDashboard },
    { id: 'goals', label: 'Metas', icon: Target },
    { id: 'settings', label: 'Ajustes', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-2 h-20 bg-background/80 backdrop-blur-xl rounded-t-[2.5rem] shadow-[0_-8px_40px_rgba(238,238,240,0.06)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center p-1.5 transition-all duration-300 min-w-[56px]",
              isActive 
                ? "bg-surface-container-high text-primary rounded-xl transform -translate-y-1" 
                : "text-on-surface/40 hover:text-primary/80"
            )}
          >
            <Icon className={cn("w-3.5 h-3.5", isActive && "fill-primary/20")} />
            <span className="text-[8px] font-bold uppercase tracking-tight mt-1">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

// --- Screens ---

const WelcomeScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface">
      <div className="w-full max-w-[480px] space-y-8 relative">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 kinetic-gradient rounded-3xl shadow-[0_0_50px_rgba(63,255,139,0.3)] flex items-center justify-center mb-4"
          >
            <Car className="text-on-primary-container w-12 h-12" />
          </motion.div>
          <h1 className="font-headline font-extrabold tracking-tight text-on-surface text-4xl">Gestão de Corrida</h1>
          <p className="text-on-surface-variant text-lg max-w-[300px]">Sua central de performance para o dia a dia no volante.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <button 
            onClick={onStart}
            className="w-full h-16 kinetic-gradient text-on-primary-container font-headline font-extrabold text-xl rounded-2xl shadow-lg hover:shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            Iniciar Aplicativo
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <p className="text-center text-on-surface-variant text-sm opacity-60">
            Versão Local • Acesso Instantâneo
          </p>
        </motion.div>

        {/* Decorative background elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[30rem] h-[30rem] bg-tertiary/5 rounded-full blur-[100px]"></div>
        </div>
      </div>
    </div>
  );
};

const HomeScreen = ({ transactions, onViewAll }: { transactions: Transaction[], onViewAll: () => void }) => {
  const balance = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  const dailyEarnings = transactions
    .filter(tx => tx.type !== 'expense' && tx.timestamp.toDateString() === new Date().toDateString())
    .reduce((acc, tx) => acc + tx.amount, 0);
  const dailyExpenses = Math.abs(transactions
    .filter(tx => tx.type === 'expense' && tx.timestamp.toDateString() === new Date().toDateString())
    .reduce((acc, tx) => acc + tx.amount, 0));
  const ridesCount = transactions.filter(tx => tx.type === 'ride').length;

  return (
    <div className="space-y-8">
      <section className="space-y-1">
        <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest">Saldo Disponível</p>
        <h1 className="text-5xl font-headline font-extrabold tracking-tighter text-on-surface">
          R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </h1>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="col-span-2 glass-card rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp className="w-24 h-24 text-primary" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <p className="font-label text-xs uppercase tracking-widest text-primary">Ganhos Diários</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-headline font-bold">R$ {dailyEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              <span className="text-primary text-sm font-bold">+12% vs ontem</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full shadow-[0_0_12px_rgba(63,255,139,0.4)]"
              />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 space-y-2">
          <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error">
            <Fuel className="w-5 h-5" />
          </div>
          <div>
            <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest">Despesas</p>
            <p className="text-2xl font-headline font-bold text-on-surface">R$ {dailyExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 space-y-2">
          <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest">Corridas</p>
            <p className="text-2xl font-headline font-bold text-on-surface">{ridesCount}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-headline font-bold tracking-tight">Atividade Recente</h2>
          <button 
            onClick={onViewAll}
            className="text-primary text-sm font-bold font-label uppercase tracking-wider hover:opacity-80"
          >
            Ver Tudo
          </button>
        </div>
        <div className="space-y-2">
          {transactions.slice(-5).reverse().map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg group hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center">
                  {tx.type === 'ride' && <Navigation className="w-5 h-5 text-primary" />}
                  {tx.type === 'expense' && <Fuel className="w-5 h-5 text-error" />}
                  {tx.type === 'bonus' && <Star className="w-5 h-5 text-primary" />}
                </div>
                <div>
                  <p className="font-bold text-on-surface">{tx.title}</p>
                  <p className="text-xs text-on-surface-variant">{tx.subtitle}</p>
                </div>
              </div>
              <p className={cn(
                "font-headline font-bold",
                tx.amount > 0 ? "text-primary" : "text-error"
              )}>
                {tx.amount > 0 ? '+' : ''}R$ {Math.abs(tx.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const HistoryScreen = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Histórico Completo</h1>
        <p className="text-on-surface-variant text-sm mt-1">Todas as suas atividades registradas.</p>
      </section>

      <div className="space-y-3">
        {transactions.slice().reverse().map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-5 bg-surface-container-low rounded-xl border border-on-surface-variant/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center">
                {tx.type === 'ride' && <Navigation className="w-5 h-5 text-primary" />}
                {tx.type === 'expense' && <Fuel className="w-5 h-5 text-error" />}
                {tx.type === 'bonus' && <Star className="w-5 h-5 text-primary" />}
              </div>
              <div>
                <p className="font-bold text-on-surface">{tx.title}</p>
                <p className="text-xs text-on-surface-variant">
                  {tx.timestamp.toLocaleDateString('pt-BR')} • {tx.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-widest mt-1">{tx.subtitle}</p>
              </div>
            </div>
            <p className={cn(
              "font-headline font-bold text-lg",
              tx.amount > 0 ? "text-primary" : "text-error"
            )}>
              {tx.amount > 0 ? '+' : ''}R$ {Math.abs(tx.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        ))}
        {transactions.length === 0 && (
          <div className="text-center py-20 text-on-surface-variant">
            <History className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>Nenhuma atividade registrada ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const StatsScreen = () => {
  const [period, setPeriod] = useState<'week' | 'month'>('week');

  // Mock data for month view
  const MOCK_MONTH_STATS = [
    { day: 'Sem 1', earnings: 1850, expenses: 320 },
    { day: 'Sem 2', earnings: 2100, expenses: 410 },
    { day: 'Sem 3', earnings: 1950, expenses: 380 },
    { day: 'Sem 4', earnings: 2430, expenses: 450 },
  ];

  const currentData = period === 'week' ? MOCK_STATS : [];
  const totalEarnings = 0;
  const totalExpenses = 0;
  const netProfit = 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-headline font-extrabold text-4xl tracking-tight mb-2">Desempenho</h1>
          <p className="text-on-surface-variant font-medium">Acompanhando sua precisão ao longo do tempo.</p>
        </div>
        <div className="bg-surface-container-high p-1.5 rounded-full flex items-center self-start">
          <button 
            onClick={() => setPeriod('week')}
            className={cn(
              "px-6 py-2 rounded-full font-bold text-sm transition-all",
              period === 'week' ? "bg-primary text-on-primary shadow-lg shadow-primary/10" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            Semana
          </button>
          <button 
            onClick={() => setPeriod('month')}
            className={cn(
              "px-6 py-2 rounded-full font-bold text-sm transition-all",
              period === 'month' ? "bg-primary text-on-primary shadow-lg shadow-primary/10" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            Mês
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-high p-6 rounded-lg flex flex-col justify-between min-h-[140px] relative overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <span className="text-on-surface-variant font-bold uppercase tracking-widest text-[10px]">Ganhos Totais</span>
            <ReceiptText className="w-5 h-5 text-primary" />
          </div>
          <div className="z-10">
            <div className="text-3xl font-headline font-black text-on-surface">R$ {totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div className="text-primary text-xs font-bold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12.4% desde o período anterior
            </div>
          </div>
        </div>

        <div className="bg-surface-container-high p-6 rounded-lg flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <span className="text-on-surface-variant font-bold uppercase tracking-widest text-[10px]">Despesas</span>
            <Fuel className="w-5 h-5 text-error" />
          </div>
          <div>
            <div className="text-3xl font-headline font-black text-on-surface">R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div className="text-on-surface-variant text-xs font-bold mt-1">Combustível, Pedágios e Manutenção</div>
          </div>
        </div>

        <div className="bg-surface-container-high p-6 rounded-lg flex flex-col justify-between min-h-[140px] border border-primary/10">
          <div className="flex justify-between items-start">
            <span className="text-on-surface-variant font-bold uppercase tracking-widest text-[10px]">Lucro Líquido</span>
            <Gem className="w-5 h-5 text-tertiary" />
          </div>
          <div>
            <div className="text-3xl font-headline font-black text-primary">R$ {netProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div className="text-on-surface-variant text-xs font-bold mt-1">Pronto para saque</div>
          </div>
        </div>
      </div>

      <section className="bg-surface-container-low rounded-xl p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-headline font-bold text-xl tracking-tight">
              Tendências {period === 'week' ? 'Semanais' : 'Mensais'}
            </h2>
            <p className="text-on-surface-variant text-sm">
              {period === 'week' ? '16 Out - 22 Out, 2023' : 'Outubro, 2023'}
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#232629" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#aaabad', fontSize: 10, fontWeight: 'bold' }} 
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ backgroundColor: '#1d2023', border: 'none', borderRadius: '8px', color: '#eeeef0' }}
              />
              <Bar dataKey="earnings" radius={[4, 4, 0, 0]}>
                {currentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.earnings > (period === 'week' ? 400 : 2000) ? '#3fff8b' : '#13ea79'} />
                ))}
              </Bar>
              <Bar dataKey="expenses" fill="#46484a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

const GoalsScreen = ({ goals, onEditGoal }: { goals: Goal[], onEditGoal: (goal: Goal) => void }) => {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Metas Atuais</h1>
        <p className="text-on-surface-variant text-sm mt-1">Acompanhe seu desempenho em tempo real.</p>
      </section>

      {goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => (
            <div 
              key={goal.id} 
              onClick={() => onEditGoal(goal)}
              className="bg-surface-container-high rounded-lg p-6 flex flex-col justify-between relative overflow-hidden h-64 cursor-pointer hover:bg-surface-container-highest transition-colors group"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">{goal.title}</span>
                  <button className="p-2 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="w-4 h-4 rotate-45" />
                  </button>
                </div>
                <h2 className="text-4xl font-headline font-black text-on-surface">
                  R$ {goal.current.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} <span className="text-xl font-normal text-on-surface-variant">/ R$ {goal.target.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </h2>
              </div>
              
              <div className="mt-auto relative z-10">
                <div className="flex items-center gap-2 bg-primary/10 text-primary w-fit px-3 py-1 rounded-full text-xs font-bold mb-4">
                  <TrendingUp className="w-3 h-3" />
                  {goal.target > 0 ? Math.round((goal.current / goal.target) * 100) : 0}% Concluído
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{goal.description}</p>
              </div>

              <div className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10">
                <Target className="w-full h-full text-primary" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface-container-low rounded-2xl p-12 text-center border-2 border-dashed border-on-surface-variant/10">
          <Target className="w-12 h-12 text-on-surface-variant/20 mx-auto mb-4" />
          <p className="text-on-surface-variant font-bold">Nenhuma meta definida.</p>
          <p className="text-on-surface-variant/60 text-sm">Vá em Ajustes para redefinir as metas padrão.</p>
        </div>
      )}
    </div>
  );
};

const ConfirmationModal = ({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar"
}: { 
  isOpen: boolean, 
  title: string, 
  message: string, 
  onConfirm: () => void, 
  onCancel: () => void,
  confirmText?: string,
  cancelText?: string
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm bg-surface-container-high rounded-3xl p-8 shadow-2xl border border-on-surface-variant/10"
      >
        <h2 className="text-xl font-headline font-bold mb-4">{title}</h2>
        <p className="text-on-surface-variant mb-8">{message}</p>
        <div className="flex gap-4">
          <button 
            onClick={onCancel}
            className="flex-1 h-12 bg-surface-container-highest text-on-surface font-bold rounded-xl"
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 h-12 bg-error text-on-error font-bold rounded-xl"
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const SettingsScreen = ({ 
  onClearHistory, 
  onClearStats, 
  onClearGoals, 
  onResetApp 
}: { 
  onClearHistory: () => void, 
  onClearStats: () => void, 
  onClearGoals: () => void, 
  onResetApp: () => void 
}) => {
  const [confirmState, setConfirmState] = useState<{ type: string, step: number } | null>(null);

  const handleAction = (type: string) => {
    setConfirmState({ type, step: 1 });
  };

  const handleConfirm = () => {
    if (!confirmState) return;
    if (confirmState.step === 1) {
      setConfirmState({ ...confirmState, step: 2 });
    } else {
      // Execute action
      if (confirmState.type === 'history') onClearHistory();
      if (confirmState.type === 'stats') onClearStats();
      if (confirmState.type === 'goals') onClearGoals();
      if (confirmState.type === 'reset') onResetApp();
      setConfirmState(null);
    }
  };

  const getModalContent = () => {
    if (!confirmState) return { title: '', message: '' };
    const isStep2 = confirmState.step === 2;
    switch (confirmState.type) {
      case 'history':
        return {
          title: isStep2 ? "TEM CERTEZA ABSOLUTA?" : "Limpar Histórico",
          message: isStep2 
            ? "Esta ação não pode ser desfeita. Todo o seu histórico de corridas será apagado permanentemente." 
            : "Deseja realmente apagar todo o seu histórico de corridas?"
        };
      case 'stats':
        return {
          title: isStep2 ? "TEM CERTEZA ABSOLUTA?" : "Limpar Estatísticas",
          message: isStep2 
            ? "Todos os dados de desempenho acumulados serão zerados." 
            : "Deseja realmente zerar todas as suas estatísticas?"
        };
      case 'goals':
        return {
          title: isStep2 ? "TEM CERTEZA ABSOLUTA?" : "Limpar Metas",
          message: isStep2 
            ? "Suas metas atuais e progresso serão removidos." 
            : "Deseja realmente apagar todas as suas metas?"
        };
      case 'reset':
        return {
          title: isStep2 ? "TEM CERTEZA ABSOLUTA?" : "Resetar Aplicativo",
          message: isStep2 
            ? "O aplicativo voltará ao estado original de fábrica. TODOS os seus dados serão perdidos." 
            : "Deseja realmente resetar o aplicativo por completo?"
        };
      default:
        return { title: '', message: '' };
    }
  };

  const modalContent = getModalContent();

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Ajustes</h1>
        <p className="text-on-surface-variant text-sm mt-1">Gerencie seus dados e preferências.</p>
      </section>

      <div className="space-y-4">
        <button 
          onClick={() => handleAction('history')}
          className="w-full p-6 bg-surface-container-high rounded-2xl flex items-center justify-between group hover:bg-surface-container-highest transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <History className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-on-surface">Limpar Histórico de Corrida</h3>
              <p className="text-xs text-on-surface-variant">Apaga todos os registros de viagens.</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
        </button>

        <button 
          onClick={() => handleAction('stats')}
          className="w-full p-6 bg-surface-container-high rounded-2xl flex items-center justify-between group hover:bg-surface-container-highest transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-on-surface">Limpar Estatísticas</h3>
              <p className="text-xs text-on-surface-variant">Zera os dados de desempenho e gráficos.</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
        </button>

        <button 
          onClick={() => handleAction('goals')}
          className="w-full p-6 bg-surface-container-high rounded-2xl flex items-center justify-between group hover:bg-surface-container-highest transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Target className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-on-surface">Limpar Metas</h3>
              <p className="text-xs text-on-surface-variant">Remove todas as metas definidas.</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="pt-8">
          <button 
            onClick={() => handleAction('reset')}
            className="w-full p-6 bg-error/10 border border-error/20 rounded-2xl flex items-center justify-between group hover:bg-error/20 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-error/20 flex items-center justify-center text-error">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-error">Resetar Tudo</h3>
                <p className="text-xs text-error/60">Deixa o aplicativo totalmente zerado.</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-error/60 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={!!confirmState}
        title={modalContent.title}
        message={modalContent.message}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmState(null)}
        confirmText={confirmState?.step === 2 ? "SIM, APAGAR TUDO" : "Sim, Continuar"}
        cancelText="Cancelar"
      />
    </div>
  );
};

const FABMenu = ({ 
  isOpen, 
  onClose, 
  onTriggerAdd 
}: { 
  isOpen: boolean, 
  onClose: () => void,
  onTriggerAdd: (type: 'ride' | 'expense', category?: string) => void
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex flex-col justify-end p-6 bg-background/60 backdrop-blur-xl"
        >
          <div className="flex-grow w-full" onClick={onClose}></div>
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="w-full max-w-md mx-auto space-y-4 mb-24"
          >
            <div className="space-y-3">
              <button 
                onClick={() => { onTriggerAdd('ride'); onClose(); }}
                className="w-full flex items-center justify-between p-5 bg-surface-container-high rounded-lg hover:bg-surface-container-highest transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="block font-headline font-bold text-on-surface">Adicionar Corrida</span>
                    <span className="text-xs text-on-surface-variant">Registrar novos ganhos manuais</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="p-5 bg-surface-container-high rounded-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center">
                    <ReceiptText className="w-6 h-6 text-error" />
                  </div>
                  <div>
                    <span className="block font-headline font-bold text-on-surface">Adicionar Gasto</span>
                    <span className="text-xs text-on-surface-variant">Selecione a categoria da despesa</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Fuel, label: 'Combustível' },
                    { icon: LayoutDashboard, label: 'Comida' },
                    { icon: Car, label: 'Manutenção' },
                    { icon: Navigation, label: 'Estacionamento' },
                  ].map((item, i) => (
                    <button 
                      key={i} 
                      onClick={() => { onTriggerAdd('expense', item.label); onClose(); }}
                      className="flex flex-col items-center justify-center p-4 bg-surface-container-low rounded-lg hover:bg-surface-container-highest transition-colors border border-on-surface-variant/5"
                    >
                      <item.icon className="w-5 h-5 text-on-surface-variant mb-2" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button 
                onClick={onClose}
                className="w-16 h-16 rounded-full bg-primary text-on-primary shadow-xl flex items-center justify-center transform hover:scale-105 active:scale-95 transition-all"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AddTransactionModal = ({ 
  type, 
  category, 
  onClose, 
  onSave 
}: { 
  type: 'ride' | 'expense', 
  category?: string, 
  onClose: () => void, 
  onSave: (amount: number) => void 
}) => {
  const [amount, setAmount] = useState('');

  const handleSave = () => {
    const numAmount = parseFloat(amount.replace(',', '.'));
    if (!isNaN(numAmount) && numAmount > 0) {
      onSave(type === 'expense' ? -numAmount : numAmount);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm bg-surface-container-high rounded-3xl p-8 shadow-2xl border border-on-surface-variant/10"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-headline font-bold">
            {type === 'ride' ? 'Nova Corrida' : `Gasto: ${category}`}
          </h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Valor (R$)</label>
            <input 
              autoFocus
              type="text" 
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              className="w-full h-16 bg-surface-container-highest border-none rounded-2xl text-3xl font-headline font-bold text-center focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <button 
            onClick={handleSave}
            disabled={!amount || isNaN(parseFloat(amount.replace(',', '.')))}
            className="w-full h-14 kinetic-gradient text-on-primary-container font-headline font-extrabold text-sm uppercase tracking-widest rounded-xl disabled:opacity-50 disabled:grayscale transition-all"
          >
            Salvar Registro
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const GoalModal = ({ 
  goal,
  onClose, 
  onSave 
}: { 
  goal: Goal,
  onClose: () => void, 
  onSave: (goalId: string, target: number) => void 
}) => {
  const [target, setTarget] = useState(goal.target.toString().replace('.', ','));

  const handleSave = () => {
    const numTarget = parseFloat(target.replace(',', '.'));
    if (!isNaN(numTarget) && numTarget > 0) {
      onSave(goal.id, numTarget);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm bg-surface-container-high rounded-3xl p-8 shadow-2xl border border-on-surface-variant/10"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-headline font-bold">Editar {goal.title}</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Novo Valor Alvo (R$)</label>
            <input 
              autoFocus
              type="text" 
              inputMode="decimal"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="0,00"
              className="w-full h-16 bg-surface-container-highest border-none rounded-2xl text-3xl font-headline font-bold text-center focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <button 
            onClick={handleSave}
            disabled={!target || isNaN(parseFloat(target.replace(',', '.')))}
            className="w-full h-14 kinetic-gradient text-on-primary-container font-headline font-extrabold text-sm uppercase tracking-widest rounded-xl disabled:opacity-50 disabled:grayscale transition-all"
          >
            Atualizar Meta
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isFABOpen, setIsFABOpen] = useState(false);
  
  // Reset logic for clean start
  useEffect(() => {
    const isReset = localStorage.getItem('app_reset_v1');
    if (!isReset) {
      localStorage.clear();
      localStorage.setItem('app_reset_v1', 'true');
      window.location.reload();
    }
  }, []);

  // Load initial state from localStorage or use defaults
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((tx: any) => ({ ...tx, timestamp: new Date(tx.timestamp) }));
      } catch (e) { return MOCK_TRANSACTIONS; }
    }
    return MOCK_TRANSACTIONS;
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('goals');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return MOCK_GOALS; }
    }
    return MOCK_GOALS;
  });

  const [lastReset, setLastReset] = useState(() => {
    const saved = localStorage.getItem('lastReset');
    return saved ? JSON.parse(saved) : { daily: new Date().toDateString(), weekly: '', monthly: '' };
  });

  const [addModal, setAddModal] = useState<{ type: 'ride' | 'expense', category?: string } | null>(null);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('lastReset', JSON.stringify(lastReset));
  }, [lastReset]);

  // Check for period end
  useEffect(() => {
    const now = new Date();
    const todayStr = now.toDateString();
    
    // Simple check for daily reset
    if (lastReset.daily !== todayStr) {
      // Reset daily goal current value and prompt for new target
      setGoals(prev => {
        const newGoals = prev.map(g => g.period === 'daily' ? { ...g, current: 0 } : g);
        const dailyGoal = newGoals.find(g => g.period === 'daily');
        if (dailyGoal) {
          setEditingGoal({ ...dailyGoal, current: 0 });
        }
        return newGoals;
      });
      setLastReset(prev => ({ ...prev, daily: todayStr }));
    }
    // Weekly and monthly could be added similarly
  }, [lastReset.daily]);

  const handleSaveTransaction = (amount: number) => {
    if (!addModal) return;

    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      title: addModal.type === 'ride' ? 'Nova Corrida' : addModal.category || 'Gasto',
      subtitle: addModal.type === 'ride' ? 'Registrada manualmente' : 'Gasto manual',
      amount: amount,
      type: addModal.type,
      timestamp: new Date(),
      category: addModal.category,
    };
    setTransactions(prev => [...prev, newTx]);
    
    // Update goals current value
    if (addModal.type === 'ride') {
      setGoals(prev => prev.map(g => ({ ...g, current: g.current + amount })));
    } else {
      // Expenses might decrease monthly goal? Usually goals are for earnings.
      // For now let's assume goals are for earnings.
    }
  };

  const handleUpdateGoal = (goalId: string, target: number) => {
    setGoals(prev => prev.map(g => 
      g.id === goalId 
        ? { ...g, target, description: `Meta atualizada para R$ ${target.toLocaleString('pt-BR')}` } 
        : g
    ));
  };

  if (!isLoggedIn) {
    return <WelcomeScreen onStart={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-background text-on-surface font-body">
      <TopAppBar onLogout={() => setIsLoggedIn(false)} />
      
      <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'home' && (
              <HomeScreen 
                transactions={transactions} 
                onViewAll={() => setActiveTab('history')} 
              />
            )}
            {activeTab === 'history' && <HistoryScreen transactions={transactions} />}
            {activeTab === 'stats' && <StatsScreen />}
            {activeTab === 'goals' && (
              <GoalsScreen 
                goals={goals} 
                onEditGoal={setEditingGoal} 
              />
            )}
            {activeTab === 'settings' && (
              <SettingsScreen 
                onClearHistory={() => setTransactions([])}
                onClearStats={() => {
                  // Stats are derived from transactions usually, but we have MOCK_STATS
                  // In a real app we'd clear the DB. Here we can just clear transactions
                  // and maybe reset the MOCK_STATS if they were stateful.
                  setTransactions([]);
                }}
                onClearGoals={() => setGoals([])}
                onResetApp={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <button 
        onClick={() => setIsFABOpen(true)}
        className="fixed right-6 bottom-24 w-14 h-14 kinetic-gradient rounded-full flex items-center justify-center text-on-primary-container shadow-[0_12px_32px_rgba(63,255,139,0.3)] z-[55] active:scale-90 transition-transform"
      >
        <Plus className="w-7 h-7 font-bold" />
      </button>

      <FABMenu 
        isOpen={isFABOpen} 
        onClose={() => setIsFABOpen(false)} 
        onTriggerAdd={(type, category) => setAddModal({ type, category })}
      />

      {addModal && (
        <AddTransactionModal 
          type={addModal.type}
          category={addModal.category}
          onClose={() => setAddModal(null)}
          onSave={handleSaveTransaction}
        />
      )}
      
      {editingGoal && (
        <GoalModal 
          goal={editingGoal}
          onClose={() => setEditingGoal(null)}
          onSave={handleUpdateGoal}
        />
      )}
      
      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
