export type ApplicationStatus = 
  | 'applied' 
  | 'interview' 
  | 'technical' 
  | 'offer' 
  | 'rejected' 
  | 'accepted';

export interface Application {
  id: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  date: string;
  url: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  applied: 'Aplicado',
  interview: 'Entrevista',
  technical: 'Prueba Técnica',
  offer: 'Oferta',
  rejected: 'Rechazado',
  accepted: 'Aceptado'
};

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  applied: 'bg-blue-100 text-blue-800',
  interview: 'bg-purple-100 text-purple-800',
  technical: 'bg-orange-100 text-orange-800',
  offer: 'bg-teal-100 text-teal-800',
  rejected: 'bg-red-100 text-red-800',
  accepted: 'bg-green-100 text-green-800'
};