# Timeout for Deno

```typescript
// Rejects with TimeoutError if the timeout is exceeded
// Resolves to the given promise result otherwise
async function timeout<T>(promise: Promise<T>, delay: number): Promise<T> 
```

(Delay is in milliseconds)

## Install

    $ deno cache ...

## Usage

```typescript
import { timeout, TimeoutError } from "..."

try{
    const promise = fetch("...")
    const res = await timeout(promise, 1000)
} catch(e){
    if(e instanceof TimeoutError)
        // ...
}
```

## Test

Run test.ts with the given timeout delay (in milliseconds)

    $ deno run test.ts 1000
    OK

    $ deno run test.ts 100
    Timeout