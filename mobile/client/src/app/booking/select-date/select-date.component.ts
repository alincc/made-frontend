import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import * as moment from 'moment';

import { Logger } from '~/shared/logger';
import { PageNames } from '~/core/page-names';
import { DayOffer, ISODate, ServiceModel } from '~/core/api/services.models';
import { ServicesServiceMock } from '~/core/api/services-service.mock';
import { BookingData } from '~/core/api/booking.data';

interface ExtendedDayOffer extends DayOffer {
  opacity: number;
}

@IonicPage()
@Component({
  selector: 'select-date',
  templateUrl: 'select-date.component.html'
})
export class SelectDateComponent {
  offers: Map<ISODate, ExtendedDayOffer>;
  services: ServiceModel[] = [ // TODO: remove after service selection is implemented
    {
      uuid: '123',
      name: 'Silkpress',
      regular_price: 100
    },
    {
      uuid: '234',
      name: 'Balayage',
      regular_price: 200
    }
  ];

  start: ISODate;
  end: ISODate;

  // Expose to the view:
  Array = Array;
  moment = moment;

  constructor(
    private bookingData: BookingData,
    private logger: Logger,
    private navCtrl: NavController,
    private servicesService: ServicesServiceMock
  ) {
  }

  async ionViewWillLoad(): Promise<void> {
    // TODO: retrieve from nav params, test data:
    const params = {
      selectedServices: [],
      service: { uuid: '' }
    };

    const { response } = await this.servicesService.getPricelist({ service_uuid: params.service.uuid }).first().toPromise();
    if (response && response.prices.length > 0) {

      // Create offers Map {[ISODate]: DayOffer} to easily get an offer by date:
      this.offers = new Map();
      for (const offer of getPricesWithOpacity(response.prices)) {
        this.offers.set(offer.date, offer);
      }

      // Set period boundaries to understand what months of calendar to create:
      this.start = moment(response.prices[0].date).startOf('month').format('YYYY-MM-DD');
      this.end = moment(response.prices[response.prices.length - 1].date).endOf('month').format('YYYY-MM-DD');
    }
  }

  ionViewWillEnter(): void {
    // TODO: start() should be moved to the first screen in booking process when it is are ready
    // and setSelectedServices() should be moved to service selection screen.
    const fakeStylistUuid = 'fakeid'; // replace with preferred stylist uuid when we have it
    this.bookingData.start(fakeStylistUuid);
    this.bookingData.setSelectedServices(this.services);
  }

  onSelectOffer(offer: DayOffer): void {
    this.logger.info('onSelectOffer', offer);

    const date = new Date(offer.date);
    this.bookingData.setDate(date);
    this.bookingData.setTotalClientPrice(offer.price);

    this.navCtrl.push(PageNames.SelectTime);
  }

  onDeleteService(service: ServiceModel): void {
    this.bookingData.deleteService(service);
  }

  onAddService(): void {
    // TODO: navigate to Add Service screen
  }
}

function getPricesWithOpacity(offers: DayOffer[], threshold = 0.2): ExtendedDayOffer[] {
  if (offers.length === 0) {
    return;
  }
  if (offers.length <= 2) {
    return offers.map((offer: DayOffer) => ({
      ...offer,
      opacity: undefined
    }));
  }
  let min = offers[0].price;
  const max = offers.slice(1).reduce((a: DayOffer, b: DayOffer) => {
    if (b.price < min) {
      min = b.price;
    }
    if (a.price > b.price) {
      return a;
    } else {
      return b;
    }
  }).price;
  const middle = (min + max) / 2;
  return offers.map((offer: DayOffer) => ({
    ...offer,
    opacity: offer.price <= middle ? 1 - (offer.price - min) / (middle - min) + threshold : undefined
  }));
}