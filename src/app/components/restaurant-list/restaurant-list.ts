import { Component , input, output, signal} from '@angular/core';
import { RestaurantCard } from '../restaurant-card/restaurant-card';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-restaurant-list',
  imports: [RestaurantCard],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.css',
})
export class RestaurantList {
  restaurants = input.required<Restaurant[]>();
  count = signal<number>(0);
  addcount(){
    this.count.update(c=>c+1);
  }
  //Declaration du output vers app
  sendApp = output <{ id : number; rating :number}>();
  onSendApp(event:{ id:number; rating:number }):void{
    this.sendApp.emit(event);
  }
  // Reçoit la liste déjà triée envoyée par AppComponent

}
