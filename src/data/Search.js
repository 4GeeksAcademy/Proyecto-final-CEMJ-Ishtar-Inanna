import React, { useState, useEffect } from react;
import { items } from "../data/items"

export function getUniqueCategories(items: item[]) {
  const categoriesSet = new Set(items.map((item) =>item.category));
  return Array.from(categoriesSet);
}

export function filterItemsByCategory(
  items: item[],
  category: string
){
  return items.filter((item)=>item.category === category);
}

export function filterPostsBySearchTerm(items: item[], term: string){
  const isInDescription = (item: item) =>
    item.description?.toLowerCase().includes(term.toLowerCase().includes)
}

