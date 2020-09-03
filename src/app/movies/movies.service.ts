import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Movie } from './movie';

@Injectable()
export class MoviesService {

    private readonly API = environment.API;
    private readonly APIKey = environment.APIKey;
    private defaultParams: HttpParams;

    constructor(private http: HttpClient) {
        this.defaultParams = new HttpParams({
            fromObject: {
                api_key: this.APIKey,
                language: 'pt-BR'
            }
        });
    }

    getMovie(id: number) {
        const url: string = `${this.API}movie/${id}`;
        return this.http.get<Movie>(url, { params: this.defaultParams });
    }

    getMovies(page: number = 1) {
        const url: string = `${this.API}discover/movie/`;

        let params: HttpParams = this.defaultParams.set('page', `${page}`);
        params = params.append('sort_by', 'popularity.desc');
        params = params.append('include_adult', 'false');
        params = params.append('include_video', 'false');

        return this.http.get(url, { params });
    }

}