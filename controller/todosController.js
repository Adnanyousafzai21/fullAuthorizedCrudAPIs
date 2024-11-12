import Todos from "../model/todos.js";

const createTodos = async (req, res, next) => {
    const { subject, description, file } = req.body
    const { id } = req.query

    if (id) {
        try {
            const updatetodo = await Todos.findByIdAndUpdate(
                id,
                { subject, description, file },
                { new: true }
            );

            if (!updatetodo) {
                return res.status(404).send({ message: "Todo not found" });
            }

            console.log("Updated todo:", updatetodo);
            return res.status(200).send({ message: "The todo is updated successfully", updatetodo });
        } catch (error) {
            console.error("Error updating todo:", error);
            return res.status(500).send({ message: "Error updating todo" });
        }
    }

    if (["subject", "description"].some((data) => data === "")) {
        return res.status(400).send({ message: "subject and description are required field" })
    }

    const createtodo = new Todos({ subject, description, file })
    console.log("after created todo")
    const createdtodo = await createtodo.save()
    console.log("todo hiteed", createdtodo)
    if (!createtodo) {
        return res.status(500).send({ messsage: "ERROR while creating the todos" })
    }

    res.status(200).send({ message: "the todo is saved successfuly !", createdtodo })
}

export const getalltodos = async (req, res, next) => {
    try {
        const { id } = req.query;

        if (id) {
            // Fetch a single todo by id
            const todo = await Todos.findById(id);
            if (!todo) {
                return res.status(404).send({ message: "Todo not found" });
            }
            return res.status(200).send({ message: "Todo data found", todo });
        } else {
            const alltodos = await Todos.find();
            if (!alltodos.length) {
                return res.status(404).send({ message: "No todos found" });
            }
            return res.status(200).send({ message: "All todos data", alltodos });
        }
    } catch (error) {
        console.error("Error fetching todos:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};


export const Deletetodos = async (req, res, next) => {
    const { _id } = req.body
    const deletedCreate = await Todos.findByIdAndDelete({ _id: _id })
    if (!deletedCreate) {
        return res.status(400).send({ message: "the todos not found" })
    }
    res.status(200).send({ message: "the todos deleted successfully!!!", deletedCreate })
}
export default createTodos