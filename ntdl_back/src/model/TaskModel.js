import TaskSchema from "./TaskSchema.js";

//CRUD
//create 
export const insertTask = (taskObj) => {
    return TaskSchema(taskObj).save();
}

//Read
export const getAllTasks = () => {
    return TaskSchema.find();
}

//Update
//@_id is ID string, @data is an object
export const switchTask = (_id, data) => {
    return TaskSchema.findByIdAndUpdate(_id, data, { new: true })
}

//delete
export const deleteTask = _id => {
    return TaskSchema.findByIdAndDelete(_id);
}
//delete many
export const deleteManyTask = ids => {
    return TaskSchema.deleteMany({_id: {$in: ids}});
}