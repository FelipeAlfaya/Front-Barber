import { User } from './user';

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

export type Appointment = {
  id: number;
  date: string;
  created_at: string;
  time: string;
  client: User;
  barber: User;
  tasks: Task[];
};
