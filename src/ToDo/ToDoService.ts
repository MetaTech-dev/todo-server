import { CreateToDoDTO, UpdateToDoDTO } from "./toDoTypes";

interface ToDo {
    title: string;
    description: string;
    author?: string;
    createdDate?: string;
    dueDate?: string;
    assignee?: string;
    priority: string;
    status: string;
    id: string;
}

const toDos: ToDo[] = [
    {
        title: "do the dishes",
        description: "there are a lot of dishes to do",
        author: "Megan",
        createdDate: "2021-01-01",
        dueDate: "2021-01-02",
        assignee: "Megan",
        priority: "high",
        status: "ready",
        id: "1",
      },
        {
        title: "do the laundry",
        description: "there are a lot of laundry to do",
        author: "Megan",
        createdDate: "2021-01-01",
        dueDate: "2021-01-02",
        assignee: "Megan",
        priority: "high",
        status: "ready",
        id: "2",
        }
]

export default class ToDoService {
    static list = () => {
        return toDos;
    }

    static create = (toDo: CreateToDoDTO) => {
        // TODO: replace this with a call to the database
        const newToDo = {
            ...toDo,
            id: Math.random().toString(),
        };

        toDos.push(newToDo);

        return newToDo;
    }

    static update = (toDo: UpdateToDoDTO) => {
        // TODO: replace this with a call to the database

        const theToDo = toDos.find((toDo) => toDo.id === toDo.id);

        if (!theToDo) {
            return null;
        }

        const updatedToDo = {
            ...theToDo,
            ...toDo,
        }

        return updatedToDo;
    }

    static remove = (id: string) => {
        // TODO: replace this with a call to the database

        const theToDo = toDos.find((toDo) => toDo.id === id);

        if (!theToDo) {
            return false;
        }

        return true;
    }

    static getOne = (id: string) => {
        // TODO: replace this with a call to the database

        const theToDo = toDos.find((toDo) => toDo.id === id);

        if (!theToDo) {
            return null;
        }

        return theToDo;
    }
}