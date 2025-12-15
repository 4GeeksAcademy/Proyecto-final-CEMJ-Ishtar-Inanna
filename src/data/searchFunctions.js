// xport function getUniqueCategories(items) {
//   const categoriesSet = new Set(items.map((item) => item.category));
//   return Array.from(categoriesSet);
// }

// export function filterItemsByCategory(items, category) {
//   if (!category) return items;

//   return items.filter((item) => item.category === category);
// }

// export function filterPostsBySearchTerm(items, term) {
//   if (!term) return items;

//   const lowerTerm = term.toLowerCase();

//   return items.filter((item) =>
//     item.description?.toLowerCase().includes(lowerTerm)
//   );
// }