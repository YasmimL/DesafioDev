import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  URLPoster: string = environment.URLPoster;
  posterSize: string = 'w220_and_h330_face/';
  currentPage: number;
  totalPages: number;

  constructor(private moviesService: MoviesService, private router: Router) {

  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.moviesService.getMovies().subscribe(data => {
      this.currentPage = 1;
      this.totalPages = (data as any).total_pages;
      this.movies = (data as any).results;
    });
  }

  getPosterURL(imgPath: string) {
    return `${this.URLPoster}${this.posterSize}${imgPath}`
  }

  loadMore() {
    this.moviesService.getMovies(++this.currentPage).subscribe(data => { this.movies.push(...(data as any).results) });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  disableLoadMore() {
    return this.currentPage === this.totalPages;
  }

  details(id: number) {
    this.router.navigate([id]);
  }


}
