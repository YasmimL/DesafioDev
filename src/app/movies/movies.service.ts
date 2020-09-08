import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Movie } from './movie';

@Injectable()
export class MoviesService {

    private readonly API = environment.API;
    private readonly APIKey = environment.APIKey;
    private defaultParams: HttpParams;

    /** Emite um evento de busca de filmes. */
    public emitSearch = new EventEmitter<string>();

    constructor(private http: HttpClient) {
        // Estes parâmetros serão utilizados por todas as requisições à API.
        this.defaultParams = new HttpParams({
            fromObject: {
                api_key: this.APIKey,
                language: 'pt-BR'
            }
        });

    }

    /**
     * Responsável por carregar informações de um filme.
     */
    getMovie(id: number) {
        const url: string = `${this.API}movie/${id}`;
        return this.http.get<Movie>(url, { params: this.defaultParams });
    }

    /**
     * Responsável por carregar uma lista de filmes.
     */
    getMovies(movieName: string = '', page: number = 1) {
        if (movieName) {
            return this.search(movieName, page);
        }

        return this.discover(page);
    }

    /**
     * Responsável por buscar filmes com base no nome informado.
     */
    search(movieName: string, page: number) {
        const url: string = `${this.API}search/movie/`;

        let params: HttpParams = this.defaultParams.set('page', `${page}`);
        params = params.append('include_adult', 'false');
        params = params.append('query', movieName);

        return this.http.get(url, { params });
    }

    /**
     * Responsável por carregar a lista de filmes mais populares.
     */
    discover(page: number) {
        const url: string = `${this.API}discover/movie/`;

        let params: HttpParams = this.defaultParams.set('page', `${page}`);
        params = params.append('sort_by', 'popularity.desc');
        params = params.append('include_adult', 'false');
        params = params.append('include_video', 'false');

        return this.http.get(url, { params });
    }

    /**
     * Notifica um evento de busca.
     */
    onSearch(movieName: string) {
        this.emitSearch.emit(movieName);
    }

}