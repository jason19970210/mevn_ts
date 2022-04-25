export default interface ITask {
    id: number;
    content: string;
    done: boolean;
    priority: number;
    createdDatetime: Date;
};

// export interface ITask {
//     id: number;
//     content: string;
//     done: boolean;
//     priority: number;
//     createdDatetime: Date;
// };

// export interface ITaskCreationRequest {
//     content: string;
//     priority: number;
// }