import { Router } from "express";
import createTodos, { Deletetodos, getalltodos } from "../controller/todosController.js";
import authMedleware from "../meddleware/authMededleware.js";

const todoRouter = Router()

todoRouter.post("/todocreate/:id?", authMedleware, createTodos)
todoRouter.get("/getlltodos/:id?", authMedleware, getalltodos)
todoRouter.post("/deltetodos", authMedleware,  Deletetodos)



export default todoRouter