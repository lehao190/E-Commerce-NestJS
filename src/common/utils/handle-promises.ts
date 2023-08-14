export const handlePromise = async <T>(promise: Promise<T>): Promise<[T | null, Error | null]> => {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
}