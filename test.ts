import { timeout, TimeoutError } from "./mod.ts"

const [_delay] = Deno.args

try {
  const delay = Number(_delay) || 1000
  const promise = fetch("http://example.com")
  const res = await timeout(promise, delay)
  console.log(res.statusText)
} catch (e) {
  if (e instanceof TimeoutError)
    console.log("Timeout!")
}
