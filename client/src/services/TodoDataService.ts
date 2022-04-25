import http from "../http-common";

class TodoDataService {
  getAllTodos(): Promise<any> {
    return http.get("/tasks");
  }

  createTodo(data: any): Promise<any> {
    return http.post("/tasks", data);
  }

  updateTodo(id: any, data: any): Promise<any> {
    return http.put(`/tasks/${id}`, data);
  }

  deleteTodo(id: any): Promise<any> {
    return http.delete(`/tasks/${id}`);
  }
}

export default new TodoDataService();
