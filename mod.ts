import { Abort, Abortable } from "./deps/abortable.ts"

export class TimeoutError extends Error {
  constructor() { super("Timed out") }
}

export namespace Timeout {
  /**
   * Abortable promise that resolves when timed out
   * @param delay Milliseconds to wait
   * @returns An abortable promise
   */
  export function wait(delay: number): Abortable<never> {
    return Abortable.create<never>((ok, err) => {
      const id = setTimeout(ok, delay)
      return () => clearInterval(id)
    })
  }

  /**
   * Abortable promise that rejects with a TimeoutError when timed out
   * @param delay Milliseconds to wait
   * @returns An abortable promise
   */
  export function error(delay: number): Abortable<never> {
    return Abortable.create<never>((ok, err) => {
      const error = new TimeoutError()
      const id = setTimeout(err, delay, error)
      return () => clearInterval(id)
    })
  }

  /**
   * Shortcut for racing the given promises with a timeout
   * that rejects whith TimeoutError when timed out
   * @param promises Promises to race with the timeout
   * @param delay Milliseconds to wait
   * @returns Race abortable promise
   */
  export function race<T>(promises: Promise<T>[], delay: number) {
    const timeout = Timeout.error(delay)
    return Abort.race([...promises, timeout])
  }
}