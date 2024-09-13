import { http, delay, HttpResponse } from "msw";
import users from "./Users.json";
import userTypes from "./UserTypes.json";

let mutableUsers = users;

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const { login, password } = await request.json();

    const user = users.find(
      (user) => user.login === login && user.password === password
    );

    if (!user) {
      return HttpResponse.json(
        { data: null, error: "user is not find" },
        { status: 401 }
      );
    }

    return HttpResponse.json({ data: user, error: null });
  }),

  http.get("/api/userTypes", async () => {
    await delay(500);
    return HttpResponse.json({ data: userTypes, error: null });
  }),

  http.get("/api/user", async ({ request }) => {
    const url = new URL(request.url);
    if (url.search.length) {
      const queryParams = {};
      url.searchParams.entries().forEach(([key, value]) => {
        if (value !== "") {
          if (queryParams[key]) {
            const temp =
              typeof queryParams[key] === "string"
                ? [queryParams[key]]
                : [...queryParams[key]];
            temp.push(value);
            queryParams[key] = temp;
          } else {
            queryParams[key] = value;
          }
        }
      });

      const queryEntries = Object.entries(queryParams);
      const filteredUsers = mutableUsers.filter((user) => {
        let eqQuery = 0;
        for (const [key, value] of queryEntries) {
          switch (key) {
            case "last_visit_date": {
              const userDate = new Date(user[key]);
              const lastVisitDateStart = new Date(value[0]);
              const lastVisitDateEnd = new Date(value[1]);

              lastVisitDateStart.getTime() < userDate.getTime() &&
                userDate.getTime() < lastVisitDateEnd.getTime() &&
                eqQuery++;
              break;
            }
            default:
              (/^\d+$/.test(value)
                ? user[key] == value
                : user[key].toLowerCase().includes(value.toLowerCase())) &&
                eqQuery++;
              break;
          }
        }

        return eqQuery === queryEntries.length;
      });

      await delay(5000);

      return HttpResponse.json({
        data: filteredUsers,
        error: null,
      });
    }

    return HttpResponse.json({
      data: mutableUsers,
      error: null,
    });
  }),

  http.post("/api/user", async ({ request }) => {
    const newUser = await request.json();
    if (!Object.keys(newUser).length) {
      return HttpResponse.json(
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

    mutableUsers.push(createdUser);

    return HttpResponse.json({ data: createdUser, error: null });
  }),

  http.get("/api/user/:id", ({ params }) => {
    const { id } = params;
    const findUser = mutableUsers.find((user) => user.id === Number(id));
    if (!findUser) {
      return HttpResponse.json(
        { data: null, error: "user is not find" },
        { status: 404 }
      );
    }
    return HttpResponse.json({ data: findUser, error: null });
  }),

  http.patch("/api/user/:id", async ({ request, params }) => {
    const { id } = params;
    const userUpdates = await request.json();

    const updatedKeys = Object.keys(userUpdates);
    if (!updatedKeys.length) {
      return HttpResponse.json(
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
    mutableUsers = mutableUsers.filter((user) => {
      if (user.id == id) {
        deletedUser = user;
      }
      return user.id !== Number(id);
    });

    if (!deletedUser) {
      return HttpResponse.json(
        { data: null, error: `Not found userId=${id}` },
        { status: 404 }
      );
    }
    return HttpResponse.json({ data: deletedUser, error: null });
  }),
];
