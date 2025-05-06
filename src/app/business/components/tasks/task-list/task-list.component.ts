import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { TaskService } from '../../../../shared/services/task.service';
import { TaskResponseDTO } from '../../../../interfaces/task-response';
import { State } from '../../../../interfaces/task-resquest';

interface EditableTask extends TaskResponseDTO {
  editing?: boolean;
}

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export default class TaskListComponent {
  tasks: EditableTask[] = [];
  isEditingTags = false;
  showTagModal = false;
  newTagName = '';
  tagCreationError = '';
  archivedNotes: any[] = [];
  editingMode = false;
  editingNote: any | null = null;
  isTagSelectorOpen = false;
  isTagEditingSelector = false;
  tagSearchTerm = '';
  selectedTagsInput = '';
  tagError = '';
  taskEditing = false;
  titleFilter: string = '';
  originalTasks: TaskResponseDTO[] = [];
  filteredTasks: (TaskResponseDTO & { editing: boolean })[] = [];
  filterArchived?: State; 

  constructor(
    private auth_service: AuthService,
    private task_service: TaskService
  ){ }

  get user() {
    return this.auth_service.user;
  }

  ngOnInit(): void {
    this.listTasks();
  }

  listTasks() {
    this.task_service.getTaskByUser(this.user.userId).subscribe({
      next: tasksList => {
        this.filteredTasks = tasksList.map(task => ({ ...task, editing: false }));
      },
      error: err => {
        console.log(err.error);
      }
    });
  }


  updateTask(task: any) {
    console.log('Tarea actualizada:', task);
  }

  getStatusText(state: string): string {
    const statusMap: {[key: string]: string} = {
        'TO_DO': 'Por hacer',
        'IN_PROGRESS': 'En progreso',
        'FINISHED': 'Completada'
    };
    return statusMap[state] || state;
  }

  filterTasks() {
    this.filteredTasks = this.originalTasks
      .map(task => ({ ...task, editing: false }))
      .filter(task => {
        const matchesTitle = this.titleFilter 
          ? task.title.toLowerCase().includes(this.titleFilter.toLowerCase())
          : true;
        
        const matchesState = this.filterArchived
          ? task.state === this.filterArchived
          : true;
        
        return matchesTitle && matchesState;
      });
  }
  
  // Modifica toggleEdit para usar filteredTasks
  toggleEdit(task: TaskResponseDTO & { editing: boolean }) {
    task.editing = !task.editing;
    
    if (!task.editing) {
      this.updateTask(task);
    }
  }

}
