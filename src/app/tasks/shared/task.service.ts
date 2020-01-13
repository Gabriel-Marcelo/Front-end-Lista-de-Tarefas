import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // tasks: Task[] = [];

  constructor(private http: HttpClient) { }

  getAll() {
   /* const list =  window.localStorage.getItem('lista-tarefas');
    if (list) {
      this.tasks = JSON.parse(list);
    }
    return this.tasks;*/
    // Na importação do environment, tirar o 'prod' do final
    return this.http.get<Task[]>(`${ environment.api }/tasks`);
  }

  getById(id: string) {
   /* const task = this.tasks.find((value) => value._id === id);
    return task;*/
    return this.http.get<Task>(`${ environment.api }/tasks/${id}`);
  }

  save(task: Task) {

    const taskBody = {
      description: task.description,
      completed: task.completed
    };

    if (task._id) {
      return this.http.put<Task>(`${environment.api}/tasks/${task._id}`, taskBody);

    } else {
      return this.http.post<Task>(`${environment.api}/tasks`, taskBody);
    }

    /*if (task._id) {
      const taskArr = this.getById(task._id);
      taskArr.description = task.description;
      taskArr.completed = task.completed;
    } else {
      let lastId = 0;
      if (this.tasks.length > 0) {
        lastId = this.tasks[this.tasks.length - 1]._id;
      }
      task._id = lastId + 1;
      task.completed = false;
      this.tasks.push(task);
    }

    window.localStorage.setItem('lista-tarefas', JSON.stringify(this.tasks));*/

  }

  delete(id: string) {

    return this.http.delete(`${environment.api}/tasks/${id}`);

    /*const taskIndex = this.tasks.findIndex((value) => value._id === id);
    this.tasks.splice(taskIndex, 1);
    window.localStorage.setItem('lista-tarefas', JSON.stringify(this.tasks));*/
  }

}
