export type PotulationStatus =
  | 'applied'
  | 'interview'
  | 'technical'
  | 'offer'
  | 'rejected'
  | 'accepted';

export interface Potulation {
  id: string;
  company: string;
  position: string;
  status: PotulationStatus;
  date: string;
  url: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const STATUS_LABELS: Record<PotulationStatus, string> = {
  applied: 'Aplicado',
  interview: 'Entrevista',
  technical: 'Prueba Técnica',
  offer: 'Oferta',
  rejected: 'Rechazado',
  accepted: 'Aceptado'
};

export const STATUS_COLORS: Record<PotulationStatus, string> = {
  applied: 'bg-blue-100 text-blue-800',
  interview: 'bg-purple-100 text-purple-800',
  technical: 'bg-orange-100 text-orange-800',
  offer: 'bg-teal-100 text-teal-800',
  rejected: 'bg-red-100 text-red-800',
  accepted: 'bg-green-100 text-green-800'
};


export interface PotulationState {
  potulations: Potulation[];
  addPotulation: (potulation: Omit<Potulation, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updatePotulation: (id: string, potulation: Partial<Potulation>) => void;
  deletePotulation: (id: string) => void;
  getPotulation: (id: string) => Potulation | undefined;
  checkDuplicate: (company: string, position: string) => boolean;
}
