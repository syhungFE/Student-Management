export interface PaginationParams{
    _page: number;
    _limit: number;
    _totalRows: number;
}

export interface ListReponse<T>{
    map(arg0: (student: any) => number): T[];
    data: T[];
    pagination: PaginationParams;
}

export interface ListParams{
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: 'asc' | 'desc';

    [key:string]: any
}