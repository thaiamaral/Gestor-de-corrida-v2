import { Transaction, Goal, DailyStat } from './types';

export const MOCK_TRANSACTIONS: Transaction[] = [];

export const MOCK_GOALS: Goal[] = [
  {
    id: 'd1',
    title: 'Meta Diária',
    current: 0,
    target: 200,
    period: 'daily',
    description: 'Defina sua meta para hoje.',
  },
  {
    id: 'w1',
    title: 'Meta Semanal',
    current: 0,
    target: 1000,
    period: 'weekly',
    description: 'Acompanhe seu progresso na semana.',
  },
  {
    id: 'm1',
    title: 'Meta Mensal',
    current: 0,
    target: 4000,
    period: 'monthly',
    description: 'Sua meta para o mês completo.',
  },
];

export const MOCK_STATS: DailyStat[] = [
  { day: 'SEG', earnings: 0, expenses: 0 },
  { day: 'TER', earnings: 0, expenses: 0 },
  { day: 'QUA', earnings: 0, expenses: 0 },
  { day: 'QUI', earnings: 0, expenses: 0 },
  { day: 'SEX', earnings: 0, expenses: 0 },
  { day: 'SÁB', earnings: 0, expenses: 0 },
  { day: 'DOM', earnings: 0, expenses: 0 },
];
