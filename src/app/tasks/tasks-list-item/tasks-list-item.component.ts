import { TaskService } from './../shared/task.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../shared/task';

@Component({
  selector: 'app-tasks-list-item',
  templateUrl: './tasks-list-item.component.html',
  styleUrls: ['./tasks-list-item.component.css']
})
export class TasksListItemComponent implements OnInit {

  // O Input está servindo para esse componente pegar a task do pai dele
  @Input()
  task: Task;

  // O Output está enviando o evento criado para o 'pai' deste componente
  @Output()
  onDeleteTask = new EventEmitter();

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  remove(task: Task) {
    this.taskService.delete(task._id).subscribe(() => {
      this.onDeleteTask.emit(task);
    });
  }

  onCompletedCheckChange(task: Task) {
    this.taskService.save(task).subscribe(task => {
      console.log(task);
    });
  }

}
