import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDto, Movie, MovieVideoDto, MovieImages, MovieCredits } from '../models/movie';
import { switchMap } from 'rxjs/operators'
import { of } from 'rxjs';
import { GenresDto } from '../models/genre';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl:string = 'https://api.themoviedb.org/3';
  apiKey:string = '93fe5772103b28cccee6f70351a4783a';
  constructor(private httpClient: HttpClient) { }

  getMovies(type:string = 'upcoming', count:number = 12){
   return this.httpClient.get<MovieDto>(
     `${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}`)
     .pipe(switchMap(res=>{
        return of(res.results.slice(0, count));
     }))
     ;
  }


  getMovie(id:string){
   return this.httpClient.get<Movie>(
     `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  getMovieImages(id:string){
   return this.httpClient.get<MovieImages>(
     `${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`);
  }

  getMovieCredits(id:string){
   return this.httpClient.get<MovieCredits>(
     `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`);
  }

  searchMovies(page:number, searchValue?:string ){
     const uri = searchValue?"/search/movie":"/movie/popular";
    return this.httpClient.get<MovieDto>(
      `${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`)
      .pipe(switchMap(res=>{
         return of(res.results);
      }))
      ;
   }

   getMovieVideos(id:string){
      return this.httpClient.get<MovieVideoDto>(
        `${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
        .pipe(switchMap(res=>{
           return of(res.results);
        }))
        ;
     }

     getMovieGenres(){
      return this.httpClient.get<GenresDto>(
        `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`)
        .pipe(switchMap(res=>{
           return of(res.genres);
        }))
        ;
     }

     getMovieByGenre(id:string, page: number){
      return this.httpClient.get<MovieDto>(
        `${this.baseUrl}/discover/movie?with_genres=${id}&page=${page}&api_key=${this.apiKey}`)
        .pipe(switchMap((res)=>{
           return of(res.results);
        })
        )
     }
   
}
