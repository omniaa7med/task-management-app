import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task-model';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  // use it if dev mode
  // private apiUrl = 'http://localhost:3000/tasks';
  private apiUrl = 'https://freckle-humble-packet.glitch.me/tasks';
  // private apiUrl = 'https://6806890be81df7060eb77cdf.mockapi.io/tasks';

  private apiKey = 'taskMangment6262';

  private get headers() {
    return new HttpHeaders({
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
    });
  }

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, { headers: this.headers });
  }

  // create new task
  createNewTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, { headers: this.headers });
  }

  // update task info
  updateTaskInfo(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task, {
      headers: this.headers,
    });
  }

  // update task status
  updateTaskStatus(id: string, status: string): Observable<any> {
    // we can handle it by PATCH but my mockapi don't allow it to handle PATCH
    // can use it if use json-server db but i use https://mockapi.io/ to try
    // return this.http.put(
    //   `${this.apiUrl}/${id}`,
    //   { status },
    //   { headers: this.headers }
    // );
    // use json-server
    return this.http.patch(
      `${this.apiUrl}/${id}`,
      { status },
      { headers: this.headers }
    );
  }

  // remove task by id
  deleteTaskById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
