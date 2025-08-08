
export interface OMDbMovie {
    Title: string;
    Year: string;
    Director: string;
    Genre: string;
    Runtime: string;
    Poster: string;
    imdbID: string;
  }
  
  export interface OMDbSearchResponse {
    Search?: OMDbMovie[];
    totalResults?: string;
    Response: string;
    Error?: string;
  }
  
  export interface OMDbDetailResponse {
    Title: string;
    Year: string;
    Director: string;
    Genre: string;
    Runtime: string;
    Poster: string;
    imdbID: string;
    Response: string;
    Error?: string;
  }
  