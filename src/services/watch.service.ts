/**
 * @class Service
 *
 */

import { Watch, WatchDto } from "../models/watch.model";
import { Mode } from "../utils/enums/mode.enum";

export class WatchService {
    public watchs: Watch[];
    private onWatchListChanged: Function;
  
    constructor() {
      const watchs: WatchDto[] = JSON.parse(localStorage.getItem('watchs')) || [];
     
      this.watchs = watchs.map(watch => new Watch(watch));

      if(watchs.length===0)
      this.watchs.push(new Watch());
    }
  
   
      
    bindWatchListChanged(callback: Function) {
      this.onWatchListChanged = callback;
    }
  
    _push(watchs: Watch[]) {
      this.onWatchListChanged(watchs);
      localStorage.setItem('watchs', JSON.stringify(watchs));
    }
  
    add(watch: Watch) {
      this.watchs.push(new Watch(watch));
  
      this._push(this.watchs);
    }
  
    edit(id: string, editWatch: Watch) {
      this.watchs = this.watchs.map(watch =>
        watch.id === id
          ? new Watch({
              ...watch,
              ...editWatch
            })
          : watch
      );
  
      this._push(this.watchs);
    }

    changeLight(id: string){
      let newWatchs: Watch[];

      this.watchs.forEach(watch=>{
        if(watch.id===id){
          let auxWatch=new Watch();
          auxWatch.id=watch.id;
          auxWatch.mode=watch.mode;
          auxWatch.idLightOn=!watch.idLightOn;
          auxWatch.timeZone=watch.timeZone;
          newWatchs.push(auxWatch)
        }else{
          newWatchs.push(watch)
        }
      });
      this.watchs=newWatchs;
      this._push(this.watchs);
    }

    changeMode(id: string){
      let newWatchs: Watch[];

      this.watchs.forEach(watch=>{
        if(watch.id===id){
          let auxWatch=new Watch();
          auxWatch.id=watch.id;
          auxWatch.mode=watch.getNextMode(); // TODO put in utils class
          auxWatch.idLightOn=watch.idLightOn;
          auxWatch.timeZone=watch.timeZone;
          newWatchs.push(auxWatch)
        }else{
          newWatchs.push(watch)
        }
      });
      this.watchs=newWatchs;
      this._push(this.watchs);
    }

    increase(id: string){
      let newWatchs: Watch[];
      this.watchs.forEach(watch=>{
        if(watch.id===id){
          let auxWatch=new Watch();
          auxWatch.id=watch.id;
          auxWatch.mode=watch.mode;
          auxWatch.idLightOn=watch.idLightOn;
          auxWatch.timeZone=watch.timeZone;
          if(watch.mode===Mode.INCREASE_HOURS){
            auxWatch.timeUTC=watch.increaseTime(3600000);
          }else if(watch.mode===Mode.INCREASE_MINUTES){
            auxWatch.timeUTC=watch.increaseTime(60000);
          }
          newWatchs.push(auxWatch)
        }else{
          newWatchs.push(watch)
        }
      });
      this.watchs=newWatchs;
      this._push(this.watchs);
    }

    increaseWatchs(watchs: Watch[]){
      this.watchs = watchs.map(watch => new Watch(this.increaseOnWatch(watch)));
      this._push(this.watchs);
    }

    increaseOnWatch(watch:Watch){
      let auxWatch=new Watch();
      auxWatch.id=watch.id;
      auxWatch.mode=watch.mode;
      auxWatch.timeUTC=watch.increaseTime(1000);
      auxWatch.timeZone=watch.timeZone;
      return auxWatch;
    }
  
  }