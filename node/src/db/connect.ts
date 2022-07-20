import { Client } from "pg";

const client = new Client({
    user: process.env.PGUSER as string,
    host: process.env.PGHOST as string,
    password: process.env.PGPASSWORD as string,
    database: process.env.PGDATABASE as string,
    port: +(process.env.PGPORT as string),
});

export default client;
