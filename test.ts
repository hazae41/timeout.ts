import { Abort } from "./deps/abortable.ts"
import { Timeout } from "./mod.ts"

const [_delay] = Deno.args

try {
  const delay = Number(_delay) || 1000

  const req1 = Abort.fetch("https://deno.land/x/abortable")
    .then(() => "Abortable")

  const req2 = Abort.fetch("https://deno.land/x/timeout")
    .then(() => "Timeout")

  const winner = await Timeout.race([req1, req2], delay)
  console.log(winner, "won")
} catch (e) {
  console.error(e)
}
