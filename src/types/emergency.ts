export interface EmergencyService {
  category: 'Police' | 'Fire' | 'Ambulance' | 'Hospital' | 'Other';
  name: string;
  phone: string;
  address: string;
}

export interface Town {
  services: EmergencyService[];
}

export interface ProvinceData {
  province: string;
  towns: Record<string, Town>;
}

export type Province = 
  | 'Limpopo'
  | 'Gauteng'
  | 'Western Cape'
  | 'Eastern Cape'
  | 'Northern Cape'
  | 'Free State'
  | 'KwaZulu-Natal'
  | 'Mpumalanga'
  | 'North West';