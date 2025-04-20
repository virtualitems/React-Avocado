export async function boundary(
  promise: Promise<unknown>,
): Promise<[Error | null, unknown]> {
  if (!(promise instanceof Promise)) {
    throw new Error('The argument must be a Promise');
  }

  try {
    const value = await promise;
    return [null, value];
  } catch (error) {
    return [error as Error, undefined];
  }
}
