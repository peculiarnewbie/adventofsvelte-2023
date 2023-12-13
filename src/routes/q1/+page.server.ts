import { json } from "@sveltejs/kit";

export async function load() {
  const res = await fetch(
    "https://advent.sveltesociety.dev/data/2023/day-one.json"
  );

  //console.log(await res.json());

  const input = await res.json();

  return { input: input };
}
