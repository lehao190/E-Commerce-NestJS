export const handlePromise = async <T>(promise: Promise<T>): Promise<[T, null] | [null, Error]> => {
  try {
    const result = await promise;
    return [result, null];
  } catch (error: unknown) {
    console.error(error);
    
    if(error instanceof Error)
      return [null, error];
  }
}