import express from 'express'
import { connectMongo } from './src/config/dbConfig.js';
import { deleteManyTask, deleteTask, getAllTasks, insertTask, switchTask } from './src/model/TaskModel.js';
import cors from 'cors'

const app = express();

const PORT = 8000;

app.use(express.json());
app.use(cors());

let fakeDb = [];
connectMongo();

app.get("/api/v1/task", async(req, res) => {
    const taskList = await getAllTasks();
    res.json({
        status: 'success',
        message: "Here are the TaskList",
        taskList,
    })
})

app.post("/api/v1/task", async (req, res) => {
    const result = await insertTask(req.body);
    console.log(result)
    res.json({
        status: 'success',
        message: "New Task is been added",
        result
    })
})

app.patch("/api/v1/task", async(req, res) => {
    const {_id, type } = req.body;
    const result = await switchTask(_id, { type })
    console.log(req.body, result);

    result?._id
        ? res.json({
                status: 'success',
                message: "The task is switched",
            })
        : res.json({
            status: 'error',
            message: "Error, unable to update the task, try again later",
        })
})

app.delete("/api/v1/task/", async(req, res) => {
    const {ids: {_id}} = req.body;
    console.log(req.body)
    const result = await deleteTask(_id);
    console.log(result)
    result?._id
        ? res.json({
            status: 'success',
            message: 'Task deleted',
        })
        : res.json({
            status: 'error',
            message: "Error, unable to delete the task, try again later",
        })
})

// app.deleteMany("/api/v1/task/", async(req, res) => {
//     // const {_id} = req.params;
//     const {ids} = req.body;

//     const result = await deleteManyTask(ids);
//     console.log(result);
//     result?.deletedCount
//         ? res.json({
//                 status: 'success',
//                 message: "All selected tasks has been deleted",
//             })
//         : res.json({
//             status: 'error',
//             message: "Error, unable to update the task, try again later",
//         })
// })

app.get("/", (req, res)=>{
    
    res.json({
        message: "server is running normal",
    });
})

app.listen(PORT, (error)=>{
    error ? console.log(error): console.log("your server is running at http://localhost:" + PORT)
})