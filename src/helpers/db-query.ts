import mysql from "mysql2/promise";

export const getData = async (sql: string) => {
	try {
		const connection = await mysql.createConnection({
			host: process.env.DATABASE_HOST,
			user: process.env.DATABASE_USERNAME,
			database: process.env.DATABASE_NAME,
			password: process.env.DATABASE_PASSWORD,
			connectTimeout: 30000,
		});

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [rows, _] = await connection.query(sql);

		connection.destroy();

		return rows;
	} catch (err) {
		console.log(err);
	}
};
