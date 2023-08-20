import { CreateStatusDTO, UpdateStatusDTO } from "./statusTypes";

interface Status {
  title: string;
  position: number;
  id: string;
}

const statuses: Status[] = [
  {
    title: "Ready",
    position: 1,
    id: "1",
  },
  {
    title: "In Progress",
    position: 2,
    id: "2",
  },
  {
    title: "Done",
    position: 3,
    id: "3",
  },
];

export default class StatusService {
  static list = () => {
    return statuses;
  };

  static create = (status: CreateStatusDTO) => {
    // TODO: replace this with a call to the database
    const newStatus = {
      ...status,
      id: Math.random().toString(),
    };

    statuses.push(newStatus);

    return newStatus;
  };

  static update = (status: UpdateStatusDTO) => {
    // TODO: replace this with a call to the database

    const theStatus = statuses.find((status) => status.id === status.id);

    if (!theStatus) {
      return null;
    }

    const updatedStatus = {
      ...theStatus,
      ...status,
    };

    return updatedStatus;
  };

  static remove = (id: string) => {
    // TODO: replace this with a call to the database

    const theStatus = statuses.find((status) => status.id === id);

    if (!theStatus) {
      return false;
    }

    return true;
  };

  static getOne = (id: string) => {
    // TODO: replace this with a call to the database

    const theStatus = statuses.find((status) => status.id === id);

    if (!theStatus) {
      return null;
    }

    return theStatus;
  };
}
