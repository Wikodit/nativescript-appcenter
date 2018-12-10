import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';

export class Common extends Observable {
  public message: string;

  constructor() {
    super();
    this.message = 'Demo Application using AppCenter';
  }
}

export enum Flags {
  PERSISTENCE_NORMAL = 0x01,
  PERSISTENCE_CRITICAL = 0x02,
  PERSISTENCE_MASK = 0xFF,
}

export class Utils {
  // public static SUCCESS_MSG(): string {
  //   let msg = `Your plugin is working on ${app.android ? 'Android' : 'iOS'}. !`;

  //   setTimeout(() => {
  //     dialogs.alert(`${msg} For real. It's really working :)`).then(() => console.log(`Dialog closed.`));
  //   }, 2000);

  //   return msg;
  // }
}
