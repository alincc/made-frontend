// Stylist profile

export interface StylistProfile {
  first_name: string;
  last_name: string;
  phone: string;
  salon_name: string;
  salon_address: string;
}


// Stylist availability days and hours

export interface StylistAvailabilityDay {
  label: string;
  weekday_iso: number;
  available: boolean;
  day_start_at: string;
  day_end_at: string;
}

export interface StylistAvailability {
  weekdays: StylistAvailabilityDay[];
}


// Weekday discounts

export interface WeekdayDiscount {
  label: string;
  weekday_iso: number;
  discount_percent: number;
}

export interface WeekdayDiscounts {
  weekdays: WeekdayDiscount[];
}


// Other discounts

export interface SimpleDiscounts {
  first_visit_discount_percent: number;
  repeat_within_1_week_discount_percent: number;
  repeat_within_2_week_discount_percent: number;
}


// Service templates

export interface ServiceTemplate {
  id?: number;
  name: string;
  description: string;
  price: number;
  duration_in_min: number;
}

export interface ServiceTemplateSet {
  id?: number;
  name: string;
  services: ServiceTemplate[];
}

export interface ServiceTemplateSets {
  sets: ServiceTemplateSet[];
}


// Services

export interface Service extends ServiceTemplate {
  is_enabled: boolean;
}

export interface Services {
  services: Service[];
}
