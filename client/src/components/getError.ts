export const getErrorMessage = (err: unknown): string => {
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  if ((err as any)?.response?.data?.message) {
    return (err as any).response.data.message;
  }
  return "Something went wrong. Please try again.";
};