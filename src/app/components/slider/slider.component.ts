import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IMAGES_SIZES } from '../../constants/ImagesSize';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({opacity: 0})),
      transition('void <=> *', [animate('1s')]),
     ])

  ]
})
export class SliderComponent implements OnInit {

  @Input() items: Movie[] = [];
  @Input() isbanner:boolean=false;
  currentSlideIndex:number =0;

  readonly imagesSizes = IMAGES_SIZES;
 
  ngOnInit(): void {

    if(!this.isbanner){
      setInterval(()=>{
        this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
      }, 3000)
    }
    
  }

}
