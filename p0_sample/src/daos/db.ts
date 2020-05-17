/*
    This is a utility for creating connections to the database.  We will define credentials
    here (from environment variables). There are a few ways to manage database connections. We
    could create a new connection for each operation. However, this is resource intensive and
    can significantly limit traffic and request-response speed. Most applications instead create
    a connection pool.

    A connection pool is a reserve of connections that can be temporarily checked out. These
    connections are not closed, but rather are lent for temporary usage before they are given
    back to the pool for reuse in another task.
*/



import { Pool } from 'pg';

export const db = new Pool({
    database: 'postgres',
    host: "database-1.ci62qbf4ot1k.us-east-2.rds.amazonaws.com",
    port: 5432,
    user: "buka",
    password: "p4ssw0rd"
});

