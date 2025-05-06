import { State } from "./task-resquest";
import { UserResponse } from "./user-response";

export interface TaskResponseDTO {
    id: number;
    title: string;
    description: string;
    state: State;
    dueDate: string;
    assignedTo: UserResponse;
    createdBy: UserResponse;
  }