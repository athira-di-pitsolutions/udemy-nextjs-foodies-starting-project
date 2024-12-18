'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import Error from "next/error";

function isInvalidText(text) {
    return !text || text.trim() === '';s
}

export async function shareMeal(formData) {
  console.log(formData);return {message:'yes'};
    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email')
    }

    if(isInvalidText(meal.title) || isInvalidText(meal.summary) || isInvalidText(meal.instructions) || isInvalidText(meal.creator) || isInvalidText(meal.creator_email) || !meal.creator_email.includes('@') || !meal.image || meal.image.size === 0) {
        return {
          message: 'Invalid input.'
        };
    }

    // await saveMeal(meal);
    return 'Success';
  }