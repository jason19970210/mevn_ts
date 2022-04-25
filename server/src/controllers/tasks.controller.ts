import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Task from "../models/task.model";

// import { Controller, Route, Get, Tags } from 'tsoa';
// import {
//     Body,
//     Controller,
//     Get,
//     Query,
//     Path,
//     Post,
//     Route,
//     SuccessResponse,
//     Example,
// } from "tsoa";


/** get all tasks */
const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    Task.find({}).exec() // find all
        .then((results) => {
            return res.status(200).json({
                "success": true,
                "todos": results,
                "count": results.length,
            });
        })
        .catch((error: Error) => {
            return res.status(500).json({
                "success": false,
                "message": error.message,
                // error,
            });
        });
};

/** add a new task */
const addTask = async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.body)
    let { content, priority } = req.body;

    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        content,
        priority
    });

    return task.save()
        .then((result) => {
            return res.status(201).json({
                "success": true,
                "todo": result,
            });
        })
        // https://www.bennadel.com/blog/2434-http-status-codes-for-invalid-data-400-vs-422.htm
        .catch((error: Error) => {
            return res.status(422).json({
                "success": false,
                "message": error.message,
                // error,
            });
        });
};

/** update a task: done, update content */
const updateTask = async (req: Request, res: Response, next: NextFunction) => {

    let { id } = req.params;

    // let { content, priority, done } = req.body;
    // let updateObj = { content, priority, done }

    // https://dba.stackexchange.com/questions/222688/mongodb-mongoose-query-findoneandupdate-doesnt-update-duplicates-the-db
    return Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then((result) => {
            if (result === null) {
                // https://stackoverflow.com/questions/11746894/what-is-the-proper-rest-response-code-for-a-valid-request-but-an-empty-data
                return res.status(404).json({
                    "success": false,
                    "error": { "code": 102, "message": "Non-exist Id" }
                });
            }
            return res.status(200).json({
                "success": true,
                "todo": result,
            });
        })
        .catch((error: Error) => {
            return res.status(500).json({
                "success": false,
                "message": error.message,
                // error,
            });
        });
};


/** delete a task */
const deleteTask = async (req: Request, res: Response, next: NextFunction) => {

    let { id } = req.params;
    return Task.findByIdAndDelete(id, { new: true })
        .then((result) => {
            if (result === null) {
                return res.status(404).json({
                    "success": false,
                    "error": { "code": 102, "message": "Non-exist id" }
                });
            }
            return res.status(200).json({
                "success": true,
                "todo": result,
            });
        })
        .catch((error: Error) => {
            return res.status(404).json({
                "success": false,
                "error": { "code": 102, "message": "Non-exist id" }
            });
        });
};

export default { getTasks, addTask, updateTask, deleteTask };


// @Route("test")
// export class TestController extends Controller {
//     @Get("{userId}")
//     public async getUser(
//         @Path() userid: number,
//         @Query() name: string
//     ): Promise<any>{
//         return {id: 1, content: "123", priority: 1, done: false, createdDatetime: new Date("2022-04-23T12:59:24.492Z")}
//     }
//     @SuccessResponse("201", "Created")
// }


// @Route("users")
// export default class TaskController extends Controller {
//     // @Example<any>({
//     //     id: "52907745-7672-470e-a803-a2f8feb52944",
//     //     name: "tsoa user",
//     //     email: "hello@tsoa.com",
//     //     phoneNumbers: [],
//     //     status: "Happy",
//     // })
//     @Get()
//     // @Post()
//     public async getUser(
//         // @Path() userId: "123",
//         // @Query() name: string
//     ): Promise<any> {
//         return { id: 1, content: "123", priority: 1, done: false, createdDatetime: new Date("2022-04-23T12:59:24.492Z") }
//     }




    // @Get()
    // public async addTask(@Body() req: Request): Promise<any> {
    //     console.log("add task");
    //     return res.status(201).json({
    //         "success": true,
    //         "task": { id: 1, content: "123", priority: 1, done: false, createdDatetime: new Date("2022-04-23T12:59:24.492Z") },
    //     });
    // }
// }