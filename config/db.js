import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'priority_list_app',
  password: 'EhjgQte5yRrSg!G7B8o9tze4s',
  port: 5432,
});

export default pool;
