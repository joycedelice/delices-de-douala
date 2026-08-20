
import { Component , input, output } from '@angular/core';
import { StarRating } from '../star-rating/star-rating';
import { Restaurant } from '../../models/restaurant';


@Component({
  selector: 'app-restaurant-card',
  imports: [StarRating ],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.css',
})
export class RestaurantCard {
  restaurant = input.required<Restaurant>()
  ratingChanged = output<{ id : number ; rating:number}>();
  selectRating( value: number):void{
    //lit j
     this.ratingChanged.emit({
      id: this.restaurant().id,
      rating:value 
    });
  }
}