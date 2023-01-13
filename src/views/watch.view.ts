/**
 * @class View
 *
 */

import { Watch } from "../models/watch.model";



  export class WatchView {
    private app: HTMLElement;
   
    private watchList: HTMLElement;
    private addWatchButton: HTMLElement;

    constructor() {
      this.app = this.getElement('#root');
      this.watchList = this.createElement('ul', 'watch-list');
      this.addWatchButton=this.createElement('button');
      this.addWatchButton.textContent='Add Watch';
      this.app.append( this.addWatchButton,this.watchList);
    }
  

    createElement(tag: string, className?: string) {
      const element = document.createElement(tag);
  
      if (className) element.classList.add(className);
  
      return element;
    }
  
    getElement(selector: string): HTMLElement {
      return document.querySelector(selector);
    }
  
    displayWatch(watchs: Watch[]) {
      // Delete all nodes
      while (this.watchList.firstChild) {
        this.watchList.removeChild(this.watchList.firstChild);
      }
  
      // Show default message
      if (watchs.length === 0) {
        const p = this.createElement('p');
        p.textContent = 'No Watch to display';
        this.watchList.append(p);
      } else {
        // Create nodes
        watchs.forEach(watch => {
          const li = this.createElement('li');
          li.id = watch.id;  
          const watchSpan = this.createElement('span');             
          const timeToShow = this.createElement('s');
          timeToShow.textContent = watch.getTimeFromDate();
          watchSpan.append(timeToShow);

          const modeButton = this.createElement('button', 'mode');
          modeButton.textContent = 'Mode';

          const increaseButton = this.createElement('button', 'increase');
          increaseButton.textContent = 'Increase';

          const lightButton = this.createElement('button', 'light');
          lightButton.textContent = 'Light';

          li.append( watchSpan, modeButton,increaseButton,lightButton);

          // Append nodes
          this.watchList.append(li);
        });
      }
    }

  
    clickMode(handler: Function) {
        this.watchList.addEventListener('click', event => {
          if ((event.target as any).className === 'mode') {
            const id = (event.target as any).parentElement.id;
            handler(id);
          }
        });
      }

      clickIncrease(handler: Function) {
        this.watchList.addEventListener('click', event => {
          if ((event.target as any).className === 'increase') {
            const id = (event.target as any).parentElement.id;
    
            handler(id);
          }
        });
      }

      clickLight(handler: Function) {
        this.watchList.addEventListener('click', event => {
          if ((event.target as any).className === 'light') {
            const id = (event.target as any).parentElement.id;
    
            handler(id);
          }
        });
      }

      increaseWatchs(handler: Function){
        handler()
      }


   
  

  }