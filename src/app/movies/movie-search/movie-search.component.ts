import { Component, OnInit } from '@angular/core';

import { MoviesService } from './../movies.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {

  movieName: string = '';

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void { }

  search() {
    this.moviesService.onSearch(this.movieName);
  }

}
