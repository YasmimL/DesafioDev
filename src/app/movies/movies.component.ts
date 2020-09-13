import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild("title") titleField: ElementRef;

  focusTitle() {
    this.titleField.nativeElement.focus();
  }

  movies: Movie[] = [];
  URLPoster: string = environment.URLPoster;
  posterSize: string = 'w220_and_h330_face/';
  currentPage: number;
  totalPages: number;
  movieName: string;

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.getMovies();
    // Inscreve esse componente para notificações de busca de filmes.
    this.moviesService.emitSearch.subscribe(this.searchMovie);
    this.focusTitle();
  }

  getMovies() {
    this.moviesService.getMovies(this.movieName).subscribe(data => {
      this.currentPage = 1;
      this.totalPages = (data as any).total_pages;
      this.movies = (data as any).results;
    });
  }

  getPosterURL(imgPath: string) {
    return `${this.URLPoster}${this.posterSize}${imgPath}`
  }

  nextPage() {
    this.moviesService.getMovies(this.movieName, ++this.currentPage).subscribe(data => {
      this.movies = (data as any).results;
      this.scrollToTop();
      this.focusTitle();
    });
  }

  goToLastPage() {
    this.moviesService.getMovies(this.movieName, this.totalPages).subscribe(data => {
      this.movies = (data as any).results;
      this.currentPage = this.totalPages;
      this.scrollToTop();
      this.focusTitle();
    })
  }

  previousPage() {
    this.moviesService.getMovies(this.movieName, --this.currentPage).subscribe(data => {
      this.movies = (data as any).results;
      this.scrollToTop();
      this.focusTitle();
    });
  }

  goToFirstPage() {
    this.getMovies();
    this.scrollToTop();
    this.focusTitle();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  disableNext() {
    return this.currentPage === this.totalPages;
  }

  disablePrevious() {
    return this.currentPage === 1;
  }

  /**
   * Navega para a rota de detalhes de um filme.
   */
  details(id: number) {
    this.router.navigate([id]);
  }

  /**
   * Callback executado quando o evento de busca de filme ocorrer.
   */
  searchMovie = (name: string) => {
    this.movieName = name;
    this.getMovies();
  }

}
