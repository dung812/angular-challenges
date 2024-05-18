export interface ITodo {
  userId: number;
  id: number;
  title: string;
  body?: string;
  completed: boolean;
}

export type WithError<T> = T & { error?: Error };
