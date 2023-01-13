import { Mode } from "./mode";
import {  Watch } from "./models";

class Controller {
  watches: Watch[];

  constructor() {
    this.watches = [new Watch("Europe/Paris")];
  }

  dispatchRerenderEvent() {
    document.dispatchEvent(new Event("rerender"));
  }

  getIndexOfWatchById(id: string) {
    return this.watches.findIndex((w) => w.id === id);
  }

  addWatch(locale: string) {
    this.watches.push(new Watch(locale));
    this.dispatchRerenderEvent();
  }

  switchWatchLight(id: string) {
    const watchIndex = this.getIndexOfWatchById(id);
    this.watches[watchIndex].on = !this.watches[watchIndex].on;
    this.dispatchRerenderEvent();
  }

  changeMode(id: string){
    const watchIndex = this.getIndexOfWatchById(id);
    this.watches[watchIndex].mode = Watch.getNextMode(this.watches[watchIndex].mode);
    this.dispatchRerenderEvent();
  }

  increase(id: string){
    const watchIndex = this.getIndexOfWatchById(id);
    if(this.watches[watchIndex].mode===Mode.INCREASE_HOURS){
      this.watches[watchIndex].time=Watch.increaseTime(3600000,this.watches[watchIndex].time)

    }else if(this.watches[watchIndex].mode===Mode.INCREASE_MINUTES){
      this.watches[watchIndex].time=Watch.increaseTime(60000,this.watches[watchIndex].time)

    }
    this.dispatchRerenderEvent();

  }

  reset(id: string){
    const watchIndex = this.getIndexOfWatchById(id);
    this.watches[watchIndex].time=new Date();
    this.dispatchRerenderEvent();

  }
  amPM(id: string){
    const watchIndex = this.getIndexOfWatchById(id);

    this.watches[watchIndex].displayFormat=Watch.toogleFormat(this.watches[watchIndex].displayFormat);
    this.dispatchRerenderEvent();

  }

}

export { Controller };
