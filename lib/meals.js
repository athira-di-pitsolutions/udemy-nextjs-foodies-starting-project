import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from 'node:fs';

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug= ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, {lower: true});
  meal.instructions = xss(meal.instructions);
 
  const originalFile = meal.image.name;
  const extension = originalFile.split('.').pop();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `${meal.slug}-${timestamp}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if(error) {
      throw new Error('Saving image failed!');
    }
  });

  meal.image = `/images/${fileName}`;
  db.prepare(`INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)`).run(meal);
}
