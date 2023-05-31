export type Barber = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  stars: number;
  tasks: Task[];
};

export type Task = {
  id: number;
  description: string;
  price: number;
};
