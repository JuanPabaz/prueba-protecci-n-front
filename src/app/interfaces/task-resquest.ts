export enum State {
    TO_DO = 'TO_DO',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED'
  }
  
export interface TaskRequest {
  title: string;
  description: string;
  state: State;
  dueDate: string;
  assignedToId: number;
  createdById: number;
}