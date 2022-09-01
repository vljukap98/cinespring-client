export class Movie {
    constructor(
        public id: number,
        public title: string,
        public orignial_title: string,
        public release_date: string,
        public vote_average: number,
        public poster_path: string,
        public backdrop_path: string,
        public genres,
    ) {}
}
