export default interface Todo {
  _id: string;
  content: string;
  priority: number;
  done: boolean;
  createdDatetime: Date;
}