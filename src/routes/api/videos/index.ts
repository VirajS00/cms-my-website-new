import { APIEvent, json } from "solid-start";
import { getData } from "~/helpers/db-query";
import { FilmsTableReturnType } from "~/types/films-db-return-type";
import { YoutubeApiResponseType } from "~/types/youtube-api-respons-type";

export const GET = async ({}: APIEvent) => {
  try {
    const url = process.env.YOUTUBE_API_URL ?? "";

    const res = await fetch(url, {
      headers: {
        "Content-type": "application/JSON",
      },
    });

    const ytData = (await res.json()) as YoutubeApiResponseType;

    const dbData = (await getData(
      "SELECT * FROM films ORDER BY sort_order ASC"
    )) as FilmsTableReturnType[];

    const returnData = ytData.items.map((item) => {
      const dbVideo = dbData.find(
        (v) => v.film_id === item.snippet.resourceId.videoId
      );

      return {
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        category: dbVideo?.category,
        role: dbVideo?.my_role,
        thumnail: item.snippet.thumbnails.default.url,
      };
    });

    return json(returnData);
  } catch (err) {
    console.log(err);
  }
};
