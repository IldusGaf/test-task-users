import { http, delay, HttpResponse } from "msw";
import users from "./Users.json";
import userTypes from "./UserTypes.json";

let mutableUsers = users;

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const { username, password } = await request.json();

    const user = users.find(
      (user) => user.login === username && user.password === password
    );

    return HttpResponse.json({ data: user, error: null });
  }),

  http.get("/api/userTypes", async () => {
    await delay(500);
    return HttpResponse.json({ data: userTypes, error: null });
  }),

  http.get("/api/user", async () => {
    await delay(500);
    return HttpResponse.json({ data: mutableUsers, error: null });
  }),

  http.post("/api/user", async ({ request }) => {
    const newUser = await request.json();
    console.log(newUser);
    if (!Object.keys(newUser).length) {
      return new HttpResponse(
        { data: null, error: "invalid body" },
        { status: 404 }
      );
    }
    const maxId = mutableUsers.reduce(
      (maxId, elem) => (maxId < elem.id ? elem.id : maxId),
      0
    );

    const createdUser = {
      id: maxId + 1,
      ...newUser,
    };

    console.log(createdUser);
    mutableUsers.push(createdUser);

    return HttpResponse.json({ data: createdUser, error: null });
  }),

  http.patch("/api/user/:id", async ({ request, params }) => {
    const { id } = params;
    const userUpdates = await request.json();

    const updatedKeys = Object.keys(userUpdates);
    if (!updatedKeys.length) {
      return new HttpResponse(
        { data: null, error: "invalid body" },
        { status: 404 }
      );
    }

    const userIndex = mutableUsers.findIndex(
      (fruit) => fruit.id === Number(id)
    );
    if (userIndex !== -1) {
      updatedKeys.forEach(
        (key) => (mutableUsers[userIndex][key] = userUpdates[key])
      );
    }
    return HttpResponse.json({ data: mutableUsers[userIndex], error: null });
  }),

  http.delete("/api/user/:id", ({ params }) => {
    const { id } = params;
    let deletedUser = null;
    mutableUsers = users.filter((user) => {
      if (user.id == id) {
        deletedUser = user;
      }
      return user.id !== Number(id);
    });

    if (!deletedUser) {
      return new HttpResponse(
        { data: null, error: `Not found userId=${id}` },
        { status: 404 }
      );
    }
    return HttpResponse.json({ data: deletedUser, error: null });
  }),
];
