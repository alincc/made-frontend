export interface GetStylistServicesParams {
  stylist_uuid: string;
}

export interface ServiceModel {
  uuid: string;
  name: string;
  regular_price: number;
}

export interface ServiceCategoryModel {
  uuid: string;
  name: string;
  services: ServiceModel[];
  category_photo_url?: string;
}

export interface GetStylistServicesResponse {
  stylist_uuid: string;
  categories: ServiceCategoryModel[];
}