import { TaskService } from './task.service';
import { Employee } from '@libs/entities';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getTasks(user: Employee): Promise<{
        totalCount: number;
        items: any[];
    }>;
    getTaskStatus(user: Employee): Promise<{
        title: string;
    }>;
}
