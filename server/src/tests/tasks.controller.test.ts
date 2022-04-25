import app from "../app";
import request from "supertest"; // npm i -D supertest @types/supertest
import mongoose from "mongoose";

// beforeAll(() => {
//     jest.setTimeout(90 * 1000);
//     // jest.useFakeTimers();
// })

// close database connection after all test
// https://stackoverflow.com/questions/50687592/jest-and-mongoose-jest-has-detected-opened-handles
afterAll((done) => {
    mongoose.connection.close();
    // await new Promise<void>(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    done();
});
// afterAll(() => {
//     mongoose.connection.close();
// });

// describe("POST /api/tasks", () => {
//     it("should return status code 201 if task is created", async () => {
//         const res = await request(app)
//             .post("/api/tasks")
//             .send({ content: "abc", priority: 2 })
//         expect(res.statusCode).toEqual(201);
//     });

//     it("should return status 422 if payload without required field", async () => {
//         const res = await request(app)
//             .post("/api/tasks")
//             .send({ priority: 2 })
//         expect(res.statusCode).toEqual(422);
//     });

//     it("should return status 422 if nothing in the POST payload", async () => {
//         const res = await request(app)
//             .post("/api/tasks")
//             .send()
//         expect(res.statusCode).toEqual(422);
//     });
// });


describe("Todo Cycle Unit Test", () => {

    // Init variables
    var taskId: string;
    var taskBody = {
        "content": "Unit Test",
        "priority": 3
    };
    var updateBody = {
        "content": "Unit Test Content Update",
        "priority": 0
    };

    // POST
    it("add a new task ", (done) => {
        request(app)
            .post("/api/tasks")
            .send(taskBody)
            .end((err, res) => {
                expect(res.statusCode).toEqual(201);
                expect(res.body).toHaveProperty("success");
                expect(res.body).toHaveProperty("todo");
                expect(res.body.success).toEqual(true);
                taskId = res.body.todo._id
            })
        // https://www.796t.com/article.php?id=19425
        done();
    });
    it("fetch all tasks containing the task just added", (done) => {
        request(app)
            .get("/api/tasks")
            .end((err, res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty("success");
                expect(res.body.success).toEqual(true);

                expect(res.body).toHaveProperty("todos");
                // https://www.codegrepper.com/code-examples/javascript/jest+expect+array+tocontain+object+with+property
                // https://eloquentcode.com/expect-an-array-to-contain-an-object-in-jest
                expect(res.body.todos).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({ _id: taskId })
                    ])
                )
            })
        done();
    });
    it("update the added task", (done) => {
        request(app)
            // https://stackoverflow.com/a/70955026
            .put(`/api/tasks/${taskId}`)
            .send(updateBody)
            .end((err, res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty("success");
                expect(res.body.success).toEqual(true);
                expect(res.body).toHaveProperty("todo");
                expect(res.body.todo._id).toEqual(taskId);
                expect(res.body.todo).toEqual(
                    expect.objectContaining(updateBody)
                );
            })
        done();
    });
    it("delete the updated task", (done) => {
        request(app)
            .delete(`/api/tasks/${taskId}`)
            .end((err, res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty("success");
                expect(res.body.success).toEqual(true);
                expect(res.body).toHaveProperty("todo");
                expect(res.body.todo._id).toEqual(taskId);
            })
        done();
    });
})