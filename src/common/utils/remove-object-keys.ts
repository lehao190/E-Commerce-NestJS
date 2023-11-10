// function exclude<User, Key extends keyof User>( user: User, keys: Key[]): Omit<User, Key> { 
//   return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key))
// )}

// function removeProperties<T, K extends keyof T> (object: T, keys: K[]): T {
//   // Use Object.keys() to get an array of the object's own keys
//   // Use Array.prototype.filter() to keep only the keys that are not in the keys array
//   // Use Array.prototype.reduce() to create a new object with the filtered keys and their values
//   return Object.keys (object).filter (key => !keys.includes (key as K)).reduce ((newObject, key) => {
//     // Assign the key-value pair to the new object
//     newObject [key as K] = object [key as K];
//     // Return the new object
//     return newObject;
//   }, {} as T); // Initialize the new object as an empty object of type T
// }