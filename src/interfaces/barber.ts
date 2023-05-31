export type Barber = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  stars: number;
  tasks: {
    id: number;
    description: string;
    price: number;
  }[];
};
