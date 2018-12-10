import { Observable } from 'tns-core-modules/data/observable';
import { Appcenter, PropertyOption } from 'nativescript-appcenter';
import { Flags } from '../../src/appcenter.common';
import { ErrorReport } from '../../src';

export class HelloWorldModel extends Observable {
  public message: string;
  private appcenter: Appcenter;

  constructor() {
    super();
    this.appcenter = new Appcenter();
    this.appcenter.start({ appSecret: '', analytics: true, crashes: true });
    // this.appcenter.analyticsListener({
    //   onBeforeSending: (report: ErrorReport) => {
    //     console.log('Before');
    //   },
    //   onSendingFailed: (report: ErrorReport, e: any) => {
    //     console.log(report);
    //     console.log(e);
    //     console.log('Failed');
    //   },
    //   onSendingSucceeded: (report: ErrorReport) => {
    //     console.log('Succeeded');
    //   }
    // });

    // this.appcenter.crashesListener({
    //   shouldProcess: (report: ErrorReport) => {
    //     console.log('should Process');
    //     return true;
    //   },
    //   shouldAwaitUserConfirmation: () => {
    //     console.log('Confirm');
    //     return false;
    //   },
    //   getErrorAttachments: (report: ErrorReport) => {
    //     return null;
    //   },
    //   onBeforeSending: (report: ErrorReport) => {
    //     console.log('before');
    //   },
    //   onSendingFailed: (report: ErrorReport, e: any) => {
    //     console.log('failed');
    //   },
    //   onSendingSucceeded: (report: ErrorReport) => {
    //     console.log('success');
    //   }
    // });
  }

  trackEvent(): void {
    console.log('Track');
    let property: [PropertyOption] = [{ key: 'John', value: 'Kennedy' }];
    this.appcenter.trackEvent('trigger', property);
  }

  testCrash(): void {
    console.log('Crash');
    console.log(this.appcenter.isCrashesEnabled());
    console.log(this.appcenter.hasCrashedInLastSession());
    this.appcenter.generateTestCrash();
  }
}
