import { getData } from "~/helpers/db-query";
import { UserReturnType } from "~/types/user-return-type";

export const db = {
	user: {
		async findUnique({
			where: { username = undefined, id = undefined, password = undefined },
		}: {
			where: { username?: string; id?: number; password?: string };
		}) {
			if (id !== undefined) {
				const userArray = (await getData(
					`SELECT user_id, username, first_name, last_name FROM users WHERE user_id='${id}' LIMIT 1`
				)) as UserReturnType[];
				return userArray.length > 0 ? userArray[0] : undefined;
			} else {
				const userArray = (await getData(
					`SELECT user_id, username, first_name, last_name FROM users WHERE username='${username}' AND password=SHA1('${password}') LIMIT 1`
				)) as UserReturnType[];

				return userArray.length > 0 ? userArray[0] : undefined;
			}
		},
	},
};
