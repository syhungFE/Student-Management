export interface Student{
    id?: string;
    name: string;
    mark: number;
    gender: 'male'|'female';
    city: string;

    createdAt?: number;
    updatedAt?: number;
}