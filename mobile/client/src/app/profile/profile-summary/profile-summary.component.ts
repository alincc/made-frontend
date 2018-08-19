import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { EmailComposer } from '@ionic-native/email-composer';
import { Store } from '@ngrx/store';

import { PageNames } from '~/core/page-names';
import { composeRequest, loading } from '~/core/utils/request-utils';
import { showAlert } from '~/core/utils/alert';

import { DefaultImage } from '~/core/core.module';

import { ProfileDataStore } from '~/profile/profile.data';
import { ProfileModel } from '~/core/api/profile.models';
import { LogoutAction } from '~/auth/auth.reducer';

@IonicPage()
@Component({
  selector: 'profile-summary',
  templateUrl: 'profile-summary.component.html'
})
export class ProfileSummaryComponent {
  profile: ProfileModel;

  isLoading = false;

  readonly DEFAULT_IMAGE = `url(${DefaultImage.User})`;

  constructor(
    private alertCtrl: AlertController,
    private clipboard: Clipboard,
    private emailComposer: EmailComposer,
    private navCtrl: NavController,
    private profileDataStore: ProfileDataStore,
    private store: Store<{}>
  ) {
  }

  async ionViewWillEnter(): Promise<void> {
    const { response } = await composeRequest<ProfileModel>(
      loading(isLoading => this.isLoading = isLoading),
      this.profileDataStore.get()
    );
    if (response) {
      this.profile = response;
    }
  }

  isProfileCompleted(): boolean {
    return Boolean(this.profile && this.profile.first_name);
  }

  onEdit(): void {
    this.navCtrl.push(PageNames.ProfileEdit, { profile: this.profile });
  }

  async onContactByEmail(mailTo: string): Promise<void> {
    const isAvailable = await this.emailComposer.isAvailable();
    if (!isAvailable) { // if sending emails is not supported on the device
      this.clipboard.copy(mailTo);
      showAlert('Email copied', 'Email successfully copied to the clipboard.');
      return;
    }
    this.emailComposer.open({ to: mailTo });
  }

  async onLogout(): Promise<void> {
    const prompt = this.alertCtrl.create({
      title: '',
      subTitle: 'Do you want to logout?',
      buttons: [{
        text: 'Logout now',
        handler: () => this.store.dispatch(new LogoutAction())
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    prompt.present();
  }
}