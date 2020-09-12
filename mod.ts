export class TimeoutError extends Error {
  constructor() { super("Timeout") }
}

// Rejects with TimeoutError if the timeout is exceeded
// Resolves to the given promise result otherwise
export async function timeout<T>(promise: Promise<T>, delay: number) {
  let id: number

  const timeout = new Promise<never>((ok, err) => {
    const error = new TimeoutError()
    id = setTimeout(err, delay, error)
  })

  return await Promise.race([promise, timeout])
    .finally(() => clearInterval(id))
}