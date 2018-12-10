import { Common, Flags } from './appcenter.common';
import { AnalyticsListener, CrashesListener, PropertyOption, InitOption } from '.';
import * as application from "tns-core-modules/application";

declare const MSAppCenter, MSCrashes, MSAnalytics: any;
declare const UIResponder: any;
export class Appcenter extends Common {
  private appCenter: any;
  private classes: Array<any>;

  constructor() {
    super();
  }

  start(option: InitOption): void {
    let classes = NSMutableArray.alloc().init();

    if (option.analytics) {
      classes.addObject(MSAnalytics);
    }

    if (option.crashes) {
      classes.addObject(MSCrashes);
    }

    MSAppCenter.startWithServices(option.appSecret, classes);
  }

  // ####### Analytics section ######## //
  trackEvent(eventName: string, properties?: [PropertyOption], persistence?: Flags): void {
    if (properties) {
      let _properties = NSMutableDictionary.alloc().init();

      properties.forEach((property) => {
        _properties.setValueForKey(property.key, property.value);
      });

      MSAnalytics.trackEventWithProperties(eventName, _properties);
    } else {
      MSAnalytics.trackEvent(eventName);
    }
  }

  pauseAnalytics(): void {
    MSAnalytics.pause();
  }

  resumeAnalytics(): void {
    MSAnalytics.resume();
  }

  enableAnalytics(arg: boolean): void {
    MSAnalytics.setEnabled(arg);
  }

  isAnalyticsEnabled(): boolean {
    return MSAnalytics.isEnabled().get();
  }

  // analyticsListener(callbacks: AnalyticsListener): void {
  //   console.log(MSAnalytics);
  //   // MSAnalytics.setListener(new this.appCenter.analytics.channel.AnalyticsListener({
  //   //   onBeforeSending: callbacks.onBeforeSending,
  //   //   onSendingFailed: callbacks.onSendingFailed,
  //   //   onSendingSucceeded: callbacks.onSendingSucceeded
  //   // }));
  // }

  // ####### Crashes section ######## //
  generateTestCrash(): void {
    MSCrashes.generateTestCrash();
  }

  hasCrashedInLastSession(): boolean {
    return MSCrashes.hasCrashedInLastSession();
  }

  getLastSessionCrashReport(): any {
    return MSCrashes.getLastSessionCrashReport();
  }

  enableCrashes(arg: boolean): void {
    MSCrashes.setEnabled(arg);
  }

  isCrashesEnabled(): boolean {
    return MSCrashes.isEnabled();
  }

  // notifyUserConfirmationDontSend(): void {
  //   MSCrashes.notifyUserConfirmation(MSCrashes.DONT_SEND);
  // }

  // crashesNotifyUserConfirmationSend(): void {
  //   MSCrashes.notifyUserConfirmation(MSCrashes.SEND);
  // }

  // crashesNotifyUserConfirmationAlwaysSend(): void {
  //   MSCrashes.notifyUserConfirmation(MSCrashes.ALWAYS_SEND);
  // }

  // crashesListener(callbacks: CrashesListener): void {
  //   let customListener = this.appCenter.crashes.AbstractCrashesListener.extend({
  //     shouldProcess: callbacks.shouldProcess,
  //     shouldAwaitUserConfirmation: callbacks.shouldAwaitUserConfirmation,
  //     onBeforeSending: callbacks.onBeforeSending,
  //     onSendingSucceeded: callbacks.onSendingSucceeded,
  //     onSendingFailed: callbacks.onSendingFailed
  //   });
  //   MSCrashes.setListener(new customListener());
  // }
}
