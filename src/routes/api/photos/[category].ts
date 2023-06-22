import { APIEvent, json } from "solid-start";
import { getData } from "~/helpers/db-query";

export const GET = async ({ params }: APIEvent) => {
  const data = await getData(
    `SELECT * FROM images WHERE category = '${params.category}'`
  );

  return json(data);
};
