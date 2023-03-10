import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  genreId:string |null = null;
  searchValue:string |null = null;
  constructor(
    private route:ActivatedRoute,
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({genreId})=>{
      if(genreId){
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      }else{
        this.getPagedMovies(1);
      }
    });
    
  }

  getMoviesByGenre(genreId:string, page: number){
this.moviesService.getMovieByGenre(genreId, page).subscribe(genreData=>{
  this.movies = genreData;
})
  }

  getPagedMovies(page:number, searchedKey?:string){
    this.moviesService.searchMovies(page, searchedKey).subscribe(movies=>{
      this.movies = movies;
    })
  }

  searchMovie(){
    if(this.searchValue){
      this.getPagedMovies(1, this.searchValue);
    }
    
  }

  paginate(event:any){
    //console.log(event);
    const pageNumber = event.page + 1;
    if(this.genreId){
      this.getMoviesByGenre(this.genreId, pageNumber);
    }else{
      if(this.searchValue){
      this.getPagedMovies(pageNumber, this.searchValue);
    }else{
      this.getPagedMovies(pageNumber);
    }
  }
  }

}
