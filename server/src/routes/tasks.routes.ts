import express, { application } from "express";
// import { Request, Response, NextFunction } from "express";
import controller from "../controllers/tasks.controller";

// import tasksController from "../controllers/tasks.controller";
// import { Controller } from 'tsoa';

const router = express.Router()

router.get('/api/tasks', controller.getTasks);
router.post('/api/tasks', controller.addTask);
router.put('/api/tasks/:id', controller.updateTask);
router.delete('/api/tasks/:id', controller.deleteTask);


// router.get('/users', (req: Request, res: Response, next: NextFunction) => {
//     const cc = new tasksController();
//     const promise = cc.getUser.apply(cc);
//     promiseHandler(cc, promise, res, next);
// });


// function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
//     return Promise.resolve(promise)
//         .then((data: any) => {
//             let statusCode;
//             if (isController(controllerObj)) {
//                 const headers = controllerObj.getHeaders();
//                 Object.keys(headers).forEach((name: string) => {
//                     response.set(name, headers[name]);
//                 });

//                 statusCode = controllerObj.getStatus();
//             }

//             if (data || data === false) { // === false allows boolean result
//                 response.status(statusCode || 200).json(data);
//             } else {
//                 response.status(statusCode || 204).end();
//             }
//         })
//         .catch((error: any) => next(error));
// }

// function isController(object: any): object is Controller {
//     return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
// }

export = router;