import { post } from "./axios";

const ROOM_URL = "/api/rooms";

export const addRoom = () => {
  return post(ROOM_URL);
};
