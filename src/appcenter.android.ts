import { Common, Flags } from './appcenter.common';
import * as utils from "tns-core-modules/utils/utils";
import { InitOption, PropertyOption, AnalyticsListener, CrashesListener } from '.';

// TYPINGS
declare const com: any;

export class Appcenter extends Common {

  private appCenter: any = com.microsoft.appcenter;
  private classes: any[] = [];

  start(option: InitOption): void {
    const application = utils.ad.getApplication();
    const analytics = this.appCenter.analytics.Analytics;
    const crashes = this.appCenter.crashes.Crashes;

    if (option.analytics) {
      this.classes.push(analytics.class);
    }

    if (option.crashes) {
      this.classes.push(crashes.class);
    }

    this.appCenter.AppCenter.start(application, option.appSecret, this.classes);
  }

  // ####### Analytics section ######## //
  trackEvent(eventName: string, properties?: [PropertyOption], persistence?: Flags): void {
    if (!persistence) { persistence = Flags.PERSISTENCE_NORMAL; }
    if (properties) {
      let _properties: any = new java.util.HashMap();

      properties.forEach((property) => {
        _properties.put(property.key, property.value);
      });

      this.appCenter.analytics.Analytics.trackEvent(eventName, _properties, persistence);
    } else {
      this.appCenter.analytics.Analytics.trackEvent(eventName, null, persistence);
    }
  }

  pauseAnalytics(): void {
    this.appCenter.analytics.Analytics.pause();
  }

  resumeAnalytics(): void {
    this.appCenter.analytics.Analytics.resume();
  }

  enableAnalytics(arg: boolean): void {
    this.appCenter.analytics.Analytics.setEnabled(arg);
  }

  isAnalyticsEnabled(): boolean {
    return this.appCenter.analytics.Analytics.isEnabled().get();
  }

  analyticsListener(callbacks: AnalyticsListener): void {
    this.appCenter.analytics.Analytics.setListener(new this.appCenter.analytics.channel.AnalyticsListener({
      onBeforeSending: callbacks.onBeforeSending,
      onSendingFailed: callbacks.onSendingFailed,
      onSendingSucceeded: callbacks.onSendingSucceeded
    }));
  }

  // ####### Crashes section ######## //
  generateTestCrash(): void {
    this.appCenter.crashes.Crashes.generateTestCrash();
  }

  hasCrashedInLastSession(): boolean {
    return this.appCenter.crashes.Crashes.hasCrashedInLastSession().get();
  }

  getLastSessionCrashReport(): any {
    return this.appCenter.crashes.Crashes.getLastSessionCrashReport();
  }

  enableCrashes(arg: boolean): void {
    this.appCenter.crashes.Crashes.setEnabled(arg);
  }

  crashesListener(callbacks: CrashesListener): void {
    let customListener = this.appCenter.crashes.AbstractCrashesListener.extend({
      shouldProcess: callbacks.shouldProcess,
      shouldAwaitUserConfirmation: callbacks.shouldAwaitUserConfirmation,
      onBeforeSending: callbacks.onBeforeSending,
      onSendingSucceeded: callbacks.onSendingSucceeded,
      onSendingFailed: callbacks.onSendingFailed
    });
    this.appCenter.crashes.Crashes.setListener(new customListener());
  }

  isCrashesEnabled(): boolean {
    return this.appCenter.crashes.Crashes.isEnabled().get();
  }

  notifyUserConfirmationDontSend(): void {
    this.appCenter.crashes.Crashes.notifyUserConfirmation(this.appCenter.crashes.Crashes.DONT_SEND);
  }

  crashesNotifyUserConfirmationSend(): void {
    this.appCenter.crashes.Crashes.notifyUserConfirmation(this.appCenter.crashes.Crashes.SEND);
  }

  crashesNotifyUserConfirmationAlwaysSend(): void {
    this.appCenter.crashes.Crashes.notifyUserConfirmation(this.appCenter.crashes.Crashes.ALWAYS_SEND);
  }
}
