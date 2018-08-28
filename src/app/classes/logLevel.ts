/**
 * Created by Mahdi-Kallel on 11/05/2017.
 */

export class CurrentLog {

  id: number;

  logLevel: string;

  current: number;

  constructor(id: number, logLevel: string, current: number) {
    this.id = id;
    this.logLevel = logLevel;
    this.current = current;
  }
}
