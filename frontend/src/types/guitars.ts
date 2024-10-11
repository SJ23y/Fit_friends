export type Guitars = {
  entities: Guitar[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}


export type Guitar = {
    id: string
    date: Date;
    title: string;
    price: number;
    articul: string;
    description: string;
    picture: string;
    type: string;
    stringsNumber: number;
  }
