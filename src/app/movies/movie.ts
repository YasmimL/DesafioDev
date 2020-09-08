/** Define a estrutura de uma instância de filme. */
export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    original_language: string;
    release_date: string;
    genres: any[];
}

