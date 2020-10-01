import { Abort, Abortable } from "https://deno.land/x/abortable/mod.ts"

export class TimeoutError extends Error {
  constructor() { super("Timeout") }
}

export namespace Timeout {
  /**
   * Abortable promise that rejects when timeout
   * @param delay Milliseconds to wait
   * @returns An abortable promise
   */
  export function promise(delay: number): Abortable<never> {
    return Abortable.create<never>((ok, err) => {
      const error = new TimeoutError()
      const id = setTimeout(err, delay, error)
      return () => clearInterval(id)
    })
  }

  /**
   * Shortcut for racing given promises with a timeout. 
   * @param promises Promises to race with the timeout
   * @param delay Milliseconds to wait
   * @returns Race abortable promise
   */
  export function race<T>(promises: Promise<T>[], delay: number) {
    const timeout = Timeout.promise(delay)
    return Abort.race([...promises, timeout])
  }
}