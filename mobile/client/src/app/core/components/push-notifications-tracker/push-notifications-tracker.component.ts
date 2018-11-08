import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Events, Nav } from 'ionic-angular';

import { PushNotificationEventDetails } from '~/shared/events/shared-event-types';
import { PushNotificationCode } from '~/shared/push/push-notification';
import { PushNotificationHandlerParams, PushNotificationToastService } from '~/shared/push/push-notification-toast';

import { ClientEventTypes } from '~/core/client-event-types';
import { PageNames } from '~/core/page-names';

import { TabIndex } from '~/main-tabs/main-tabs.component';

@Component({
  selector: 'push-notifications-tracker',
  // We only show toasts in the component, no template needed:
  template: ''
})
export class PushNotificationsTrackerComponent implements OnInit, OnDestroy {
  static toastCssClass = 'PushNotificationToast';
  static toastVisibleDurationMs = 5000;

  // We have to pass Nav as a param because of using this component inside app.component.
  // Nav is needed for navigation side-effects on push notification received.
  @Input() nav: Nav;

  constructor(
    private events: Events,
    private pushToast: PushNotificationToastService
  ) {
  }

  ngOnInit(): void {
    this.pushToast.subscribe(this.handlePushNotification);
  }

  ngOnDestroy(): void {
    this.pushToast.unsubscribe(this.handlePushNotification);
  }

  private handlePushNotification = (details: PushNotificationEventDetails): PushNotificationHandlerParams | void => {
    // Put the differencies between notifications in the switch/case:
    switch (details.code) {

      case PushNotificationCode.hint_to_first_book:
        return {
          buttonText: 'Book',
          onClick: async (): Promise<void> => {
            await this.nav.setRoot(PageNames.MainTabs);
            this.events.publish(ClientEventTypes.selectMainTab, TabIndex.Home);
          }
        };

      default:
        return;
    }
  };
}
