import './index.css';
import { MyClass } from './example-unit';
import { WatchController } from './controllers/watch.controller';
import { WatchService } from './services/watch.service';
import { WatchView } from './views/watch.view';


const app=new WatchController(new WatchService(),new WatchView())
