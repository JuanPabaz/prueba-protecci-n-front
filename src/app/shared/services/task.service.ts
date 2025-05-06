import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskResponseDTO } from '../../interfaces/task-response';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/1.0/task';

  constructor(private http: HttpClient) { }

  getTaskByUser(idUser: number):Observable<TaskResponseDTO[]>{
    return this.http.get<TaskResponseDTO[]>(`${this.baseUrl}/${idUser}`);
  }
}
