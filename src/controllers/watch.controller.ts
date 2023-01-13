/**
 * @class Controller
 *
 * @param model
 * @param view
 */

import { Watch } from "../models/watch.model";
import { WatchService } from "../services/watch.service";
import { WatchView } from "../views/watch.view";

export class WatchController {
    
    constructor(private watchService: WatchService, private watchView: WatchView) {

      // binding
     this.watchService.bindWatchListChanged(this.onWatchListChanged);
     this.watchView.clickMode(this.onClickMode)
     this.watchView.clickIncrease(this.onClickIncrease)
     this.watchView.clickLight(this.onClickLight)
    
      this.onWatchListChanged(this.watchService.watchs);

      setInterval(()=>{
        this.watchView.increaseWatchs(this.onIncreaseSecond)
      },1000)
    }
  
    onWatchListChanged = (watch: Watch[]) => {
        this.watchView.displayWatch(watch);
      };
    
    onClickLight=(id: string)=>{

        this.watchService.changeLight(id)
    };
    onClickIncrease=(id: string)=>{
        this.watchService.increase(id);
    };
    onClickMode=(id: string)=>{
        this.watchService.changeMode(id)
    };
    onAddWatch=()=>{
        this.watchService.add(new Watch);
    };

    onIncreaseSecond=()=>{
        this.watchService.increaseWatchs(this.watchService.watchs)
    }


  }