import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { loading } from '~/core/utils/loading';
import { createNavHistoryList, PageDescr } from '~/core/functions';
import { AuthApiService, AuthCredentials, UserRole } from '~/core/auth-api-service/auth-api-service';
import { ServerFieldError } from '~/shared/api-errors';
import { PageNames } from '~/core/page-names';

export enum LoginOrRegisterType {
  login,
  register
}

@IonicPage({
  segment: 'logreg'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login-register.component.html'
})
export class LoginRegisterComponent {
  // this should be here if we using enum in html
  protected LoginOrRegisterType = LoginOrRegisterType;

  pageType: LoginOrRegisterType;
  formData = { email: '', password: '' };
  passwordType = 'password';

  constructor(
    public navParams: NavParams,
    private navCtrl: NavController,
    private authService: AuthApiService
  ) {
    this.pageType = this.navParams.get('pageType') as LoginOrRegisterType;
  }

  @loading
  async login(): Promise<void> {
    try {
      // Call auth API
      const authCredentials: AuthCredentials = {
        email: this.formData.email,
        password: this.formData.password,
        role: UserRole.stylist
      };
      const authResponse = await this.authService.doAuth(authCredentials);

      // Find out what page should be shown to the user and navigate to
      // it while also properly populating the navigation history
      // so that Back buttons work correctly. The Login page should
      // be the first in this list.
      const loginPage: PageDescr = {
        page: PageNames.LoginRegister,
        params: { pageType: LoginOrRegisterType.login }
      };
      const pages = [loginPage, ...createNavHistoryList(authResponse.profile_status)];
      this.navCtrl.setPages(pages);
    } catch (e) {
      if (e instanceof ServerFieldError) {
        // TODO: Iterate over e.errors Map and show all errors on the form.
      }
      throw e;
    }
  }

  @loading
  async register(): Promise<void> {
    const authCredentialsRecord: AuthCredentials = {
      email: this.formData.email,
      password: this.formData.password,
      role: UserRole.stylist
    };
    await this.authService.registerByEmail(authCredentialsRecord);

    this.navCtrl.push(PageNames.RegisterSalon, {}, { animate: false });
  }

  onLoginOrRegister(): void {
    if (this.pageType === LoginOrRegisterType.login) {
      this.login();
    } else if (this.pageType === LoginOrRegisterType.register) {
      this.register();
    }
  }

  switchPasswordType(): void {
    this.passwordType = this.passwordType === 'password' ? 'type' : 'password';
  }

  resetPassword(): void {
    // TODO: add api call when it will be ready
  }
}