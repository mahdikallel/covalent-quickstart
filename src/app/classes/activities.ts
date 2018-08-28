/**
 * Created by Mahdi-Kallel on 16/05/2017.
 */

export class Activity {

  private id: number;

  private userId: number;

  private action: string;

  private objectName: string;

  private oldObject?: any;

  private newObject?: any;

  get getOldObject(): any {
    return this.oldObject;
  }

  set setOldObject(value: any) {
    this.oldObject = value;
  }

  get getNewObject(): any {
    return this.newObject;
  }

  set setNewObject(value: any) {
    this.newObject = value;
  }

  private time?: string;

  constructor() {
    this.userId = Number(localStorage.getItem('currentUser'));
    let currentdate = new Date();
    this.setTime = currentdate.getDate() + '/'
      + (currentdate.getMonth() + 1) + '/'
      + currentdate.getFullYear() + ' '
      + currentdate.getHours() + ':'
      + currentdate.getMinutes() + ':'
      + currentdate.getSeconds() + ':'
      + currentdate.getMilliseconds();
  }

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
  }

  get getUserId(): number {
    return this.userId;
  }

  set setUserId(value: number) {
    this.userId = value;
  }

  get getAction(): string {
    return this.action;
  }

  set setAction(value: string) {
    this.action = value;
  }

  get getObjectName(): string {
    return this.objectName;
  }

  set setObjectName(value: string) {
    this.objectName = value;
  }


  get getTime(): string {
    return this.time;
  }

  set setTime(value: string) {
    this.time = value;
  }
}
