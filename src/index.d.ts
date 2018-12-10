import { Common } from './appcenter.common';
export declare class Appcenter extends Common {
  start(option: InitOption): void;
  trackEvent(eventName: string, properties?: [PropertyOption], persistence?: Flags): void;
  pauseAnalytics(): void;
  resumeAnalytics(): void;
  enableAnalytics(arg: boolean): void;
  isAnalyticsEnabled(): boolean;
  analyticsListener(callbacks: AnalyticsListener): void;
  generateTestCrash(): void;
  hasCrashedInLastSession(): boolean;
  getLastSessionCrashReport(): any;
  enableCrashes(arg: boolean): void;
  crashesListener(callbacks: CrashesListener): void;
  isCrashesEnabled(): boolean;
  notifyUserConfirmationDontSend(): void;
  crashesNotifyUserConfirmationSend(): void;
  crashesNotifyUserConfirmationAlwaysSend(): void;
}

export interface InitOption {
  appSecret: string;
  analytics: boolean;
  crashes: boolean;
}

export interface PropertyOption {
  key: string;
  value: string;
}

export interface AnalyticsListener {
  onBeforeSending?: (log: ErrorReport) => void;
  onSendingFailed?: (log: ErrorReport, e: any) => void;
  onSendingSucceeded?: (log: ErrorReport) => void;
}

export interface ErrorReport {
  getId(): string;
  getThreadName(): string;
  getThrowable(): any;
  getAppStartTime(): Date;
  getAppErrorTime(): Date;
  getDevice(): Device;
  setId(id: string): void;
  setThreadName(threadName: string): void;
  setThrowable(throwable: any): void;
  setAppStartTime(appStartTime: Date): void;
  setAppErrorTime(appErrorTime: Date): void;
  setDevice(device: Device): void;
}


export interface CrashesListener {
  shouldProcess?: (report: ErrorReport) => void;
  shouldAwaitUserConfirmation?: () => boolean;
  getErrorAttachments?: (report: ErrorReport) => any;
  onBeforeSending?: (report: ErrorReport) => void;
  onSendingFailed?: (report: ErrorReport, e: any) => void;
  onSendingSucceeded?: (report: ErrorReport) => void;
}

export interface Device {
  getSdkName(): string;
  setSdkName(sdkName: string): void;
  getSdkVersion(): string;
  setSdkVersion(sdkVersion: string): void;
  getModel(): string;
  setModel(model: string): void;
  getOemName(): string;
  setOemName(oemName: string): void;
  getOsName(): string;
  setOsName(osName: string): void;
  getOsVersion(): string;
  setOsVersion(osVersion: string): void;
  getOsBuild(): string;
  setOsBuild(osBuild: string): void;
  getOsApiLevel(): number;
  setOsApiLevel(osApiLevel: number);
  getLocale(): string;
  setLocale(locale: string): void;
  getTimeZoneOffset(): number;
  setTimeZoneOffset(timeZoneOffset: number): void
  getScreenSize(): string;
  setScreenSize(screenSize: string): void;
  getAppVersion(): string;
  setAppVersion(appVersion: string): void;
  getCarrierName(): string;
  setCarrierName(carrierName: string): void;
  getCarrierCountry(): string;
  setCarrierCountry(carrierCountry: string): void;
  getAppBuild(): string;
  setAppBuild(appBuild: string): void;
  getAppNamespace(): string;
  setAppNamespace(appNamespace: string): void;
}

export enum Flags {
  PERSISTENCE_NORMAL = 0x01,
  PERSISTENCE_CRITICAL = 0x02,
  PERSISTENCE_MASK = 0xFF,
}