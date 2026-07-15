import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({logger: true});

server.register(cors, {
   origin: "*", 
});


const teams = [
    { id: 1, name: "McLaren" },
    { id: 2, name: "Ferrari" },
    { id: 3, name: "Red Bull Racing" },
    { id: 4, name: "Mercedes" },
    { id: 5, name: "Aston Martin" },
    { id: 6, name: "Alpine" },
    { id: 7, name: "Haas" },
    { id: 8, name: "Racing Bulls" },
    { id: 9, name: "Williams" },
    { id: 10, name: "Cadillac" },
    { id: 11, name: "Sauber" }
];

const drivers = [
    { id: 1, name: "Max Verstappen", teamId: 3 },
    { id: 2, name: "Yuki Tsunoda", teamId: 3 },

    { id: 3, name: "Charles Leclerc", teamId: 2 },
    { id: 4, name: "Lewis Hamilton", teamId: 2 },

    { id: 5, name: "Lando Norris", teamId: 1 },
    { id: 6, name: "Oscar Piastri", teamId: 1 },

    { id: 7, name: "George Russell", teamId: 4 },
    { id: 8, name: "Andrea Kimi Antonelli", teamId: 4 },

    { id: 9, name: "Fernando Alonso", teamId: 5 },
    { id: 10, name: "Lance Stroll", teamId: 5 },

    { id: 11, name: "Pierre Gasly", teamId: 6 },
    { id: 12, name: "Franco Colapinto", teamId: 6 },

    { id: 13, name: "Esteban Ocon", teamId: 7 },
    { id: 14, name: "Oliver Bearman", teamId: 7 },

    { id: 15, name: "Liam Lawson", teamId: 8 },
    { id: 16, name: "Isack Hadjar", teamId: 8 },

    { id: 17, name: "Alexander Albon", teamId: 9 },
    { id: 18, name: "Carlos Sainz", teamId: 9 },

    { id: 19, name: "Valtteri Bottas", teamId: 10 },
    { id: 20, name: "Sergio Pérez", teamId: 10 },

    { id: 21, name: "Nico Hülkenberg", teamId: 11 },
    { id: 22, name: "Gabriel Bortoleto", teamId: 11 }

    ];

server.get("/teams", async (request, response) => {
    response.type("application/json").code(200)

    return { teams };
});

server.get("/drivers", async (request, response) => {
    response.type("application/json").code(200)

    return { drivers };
});

interface DriverParams {
    id: string;
}

server.get<{Params: DriverParams}>("/drivers/:id", async (request, response)=> {
    const id =  parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
        response.type("application/json").code(404);
        return { error: "Driver not found"};
    } else {
        response.type("application/json").code(200);
        return {driver};
    }
});

server.listen({port: 3000}, () => {
    console.log("Server is running on port 3000");
});