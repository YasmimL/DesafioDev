import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MoviesService } from './../movies.service';
import { Movie } from '../movie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  public id: number;
  public movie: Movie;
  URLPoster: string = environment.URLPoster;
  posterSize: string = 'w300_and_h450_bestv2/';
  runtime: number;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getMovie();
  }

  getMovie() {
    this.moviesService.getMovie(this.id).subscribe(data => {
      this.movie = data;
      console.dir(this.movie);
    });

  }

  getPosterURL(imgPath: string) {
    return `${this.URLPoster}${this.posterSize}${imgPath}`;
  }

  getRunTime(runtime: number) {
    const horas = Math.floor(runtime / 60);
    const minutos = runtime % 60;

    return `${horas}h ${minutos}m`
  }

  getDisplayGenres(genres: any[]) {
    return genres.map(genre => genre.name).join(", ");
  }

}
