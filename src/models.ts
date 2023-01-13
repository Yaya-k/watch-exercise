import { Mode } from "./mode";



class Watch {
  id: string;
  time: Date;
  timezone: string;
  mode: Mode;
  on: boolean;
  displayFormat:string;

  constructor(locale: string) {
    this.id = this.uuidv4();
    this.time = new Date();
    this.timezone = locale;
    this.mode = Mode.SLEEP;
    this.on = true;
    this.displayFormat="fr-FR"
  }

  uuidv4(): string { //
    return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
      /[018]/g,
      (c: number) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
  }

  static getNextMode(mode:Mode){
    switch(mode) { 
      case Mode.INCREASE_HOURS: { 
         return Mode.INCREASE_MINUTES
      } 
      case Mode.INCREASE_MINUTES: { 
         return Mode.SLEEP
      } 
      case Mode.SLEEP: { 
        return Mode.INCREASE_HOURS
     } 
     default:
      return Mode.SLEEP

      
   } 
   
  }

  static increaseTime(amongToIncreaseInMili: number,time:Date): Date{

    return new Date(time.getTime()+amongToIncreaseInMili)
  }

  static toogleFormat(format:string): string{
      return format==="fr-FR" ? "us-US": "fr-FR";
  }
}

export { Watch };
