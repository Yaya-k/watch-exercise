/**
 * @class Model
 *
 */

import { Mode } from "../utils/enums/mode.enum";

  export interface WatchDto {
      timeUTC : Date;
      mode: string;
      idLightOn:boolean;
      timeZone:number 
    }

  export class Watch {
    public id: string; // for localStorage
    public timeUTC : Date;
    public mode: string;
    public idLightOn:boolean;
    public timeZone:number 

    constructor(
      { timeUTC, mode, idLightOn }: WatchDto = {
        timeUTC: new Date(),
        mode: Mode.SLEEP,
        idLightOn: false,
        timeZone:1 
      }
    ) {
      this.id = this.uuidv4();
      this.timeUTC = timeUTC;
      this.mode = mode;
      this.idLightOn = idLightOn;
    }
    
    toogleLight():void{
      this.idLightOn=!this.idLightOn;
    }

    getTimeFromDate():string{
      return new Date(this.timeUTC.getTime()+this.timeZone*3600000).toUTCString().split(" ")[4]
    }

    getNextMode():Mode{
      switch(this.mode) { 
        case Mode.INCREASE_HOURS: { 
           return Mode.INCREASE_MINUTES
        } 
        case Mode.INCREASE_MINUTES: { 
           return Mode.SLEEP
        } 
        case Mode.SLEEP: { 
          return Mode.INCREASE_HOURS
       } 
        default: { 
           break; 
        } 
     } 
     
    }

    increaseTime(amongToIncreaseInMili: number): Date{

      return new Date(this.timeUTC.getTime()+amongToIncreaseInMili)
    }

  
  
    uuidv4(): string {
      return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
        /[018]/g,
        (c: number) =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
      );
    }
  }