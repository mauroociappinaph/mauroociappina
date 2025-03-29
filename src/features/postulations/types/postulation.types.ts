export interface Postulation {
  id: string;
  position: string;
  company: string;
  status: string;
  applicationDate: string;
  link: string;
  recruiterContact: string;
  sendEmail: boolean;
  sendCv: boolean;
  description: string;
  userId: string;
}

export type CreatePostulationDTO = Omit<Postulation, 'id'>; 