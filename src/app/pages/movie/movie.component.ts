import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie, MovieVideo, MovieImages, MovieCredits } from 'src/app/models/movie';
import { IMAGES_SIZES } from '../../constants/ImagesSize';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  

  movie:Movie |null =null;

  imagesSizes = IMAGES_SIZES;

  movieVideos: MovieVideo [] = [];

  movieImages: MovieImages| null =null;

  movieCredits: MovieCredits |null = null;

  constructor(private route: ActivatedRoute, private moviesService:MoviesService) { }

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({id})=>{
    this.getMovie(id);
    this.getMovieVideos(id);
    this.getMovieImages(id);
    this.getMovieCredits(id);
    })
  }

  ngOnDestroy(): void {
    console.log("component dis");
  }

  getMovie(id:string) {
    this.moviesService.getMovie(id).subscribe(movie=>{
      this.movie = movie;
    });
  }

  getMovieVideos(id:string){
    this.moviesService.getMovieVideos(id).subscribe(movie=>{
      this.movieVideos = movie;
    });
  }

  getMovieImages(id:string){
    this.moviesService.getMovieImages(id).subscribe(movieImages=>{
      this.movieImages = movieImages;
    });
  }

  getMovieCredits(id:string){
    this.moviesService.getMovieCredits(id).subscribe(movieCreditsData=>{
      this.movieCredits = movieCreditsData;
      console.log( this.movieCredits);
    });
  }
}
