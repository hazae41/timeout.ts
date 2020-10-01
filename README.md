# Timeout for Deno

```typescript
// Rejects with TimeoutError if the timeout is exceeded
// Resolves to the given promise result otherwise
async function timeout<T>(promise: Promise<T>, delay: number): Promise<T> 
```

(Delay is in milliseconds)

## Install

    $ deno cache https://deno.land/x/timeout/mod.ts

## Usage with Promise

```typescript
import { Timeout, TimeoutError } from "https://deno.land/x/timeout/mod.ts"

try{
    const req1 = fetch("...")
    const req2 = fetch("...")

    // Requests are ignored if the delay is exceeded
    const res = await Timeout.race([req1, req2], 1000)
} catch(e){
    if(e instanceof TimeoutError)
        // Timed out
}
```

## Usage with Abortable

```typescript
import { Abort, Abortable } from "https://deno.land/x/abortable/mod.ts"
import { Timeout, TimeoutError } from "https://deno.land/x/timeout/mod.ts"

try{
    const req = Abort.fetch("...")
    const req2 = Abort.fetch("...")

    // Both requests are aborted if the delay is exceeded
    const res = await Timeout.race([req1, req2], 1000)
} catch(e){
    if(e instanceof TimeoutError)
        // Timed out
}
```

## Test

Run test.ts with the given timeout delay (in milliseconds)

    $ deno run test.ts 1000
    OK

    $ deno run test.ts 100
    Timeout