import { GetTaskListUsecase } from './usecases/getTaskList.usecase';
import { GetTaskStatusUsecase } from './usecases/getTaskStatus.usecase';
import { Employee } from '@libs/entities';
export declare class TaskService {
    private readonly getTaskListUsecase;
    private readonly getTaskStatusUsecase;
    constructor(getTaskListUsecase: GetTaskListUsecase, getTaskStatusUsecase: GetTaskStatusUsecase);
    getTasks(user: Employee): Promise<{
        totalCount: number;
        items: any[];
    }>;
    getTaskStatus(user: Employee): Promise<{
        title: string;
    }>;
}
