import { Component, OnInit } from '@angular/core';

import { MoviesService } from './movies.service';
import { environment } from 'src/environments/environment';
import { Movie } from './movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];

  URLPoster = environment.URLPoster;

  constructor(private moviesService: MoviesService) {

  }

  ngOnInit(): void {
    // const id: number = 550;
    // this.moviesService.getMovie(id).subscribe(console.log);
    this.moviesService.getMovies().subscribe(data => { this.movies = (data as any).results });
    this.moviesService.getMovies().subscribe(console.dir);

  }

  getPosterURL(imgPath: string) {
    return `${this.URLPoster}${imgPath}`
  }


}
