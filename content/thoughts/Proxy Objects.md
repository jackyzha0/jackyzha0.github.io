---
title: "Proxy Objects"
date: "2023-08-31"
tags:
  - seed
---

[Source](https://trpc.io/blog/tinyrpc-client#-the-proxy-remapping)

Allows us to create a 'fake' object that lets us intercept attribute accesses and calls with some funky stuff under the hood.

```ts
interface ProxyCallbackOptions {
  path: string[];
  args: unknown[];
}
 
type ProxyCallback = (opts: ProxyCallbackOptions) => unknown;

function createRecursiveProxy(callback: ProxyCallback, path: string[]) {
  const proxy: unknown = new Proxy(
    () => {
      // dummy no-op function since we don't have any
      // client-side target we want to remap to
    },
    {
      get(_obj, key) {
        if (typeof key !== 'string') return undefined;
 
        // Recursively compose the full path until a function is invoked
        return createRecursiveProxy(callback, [...path, key]);
      },
      apply(_1, _2, args) {
        // Call the callback function with the entire path we
        // recursively created and forward the arguments
        return callback({
          path,
          args,
        });
      },
    },
  );
 
  return proxy;
}
```

- The `get` method handles property accesses such as `post.byId`. The key is the property name we're accessing, so when we type `post` our `key` will be `post`, and when we type `post.byId` our `key` will be `byId`. The recursive proxy combines all of these keys into a final path, e.g. ["post", "byId", "query"], that we can use to determine the URL we want to send a request to.
- The `apply` method is called when we invoke a function on the proxy, such as `.query(args)`. The `args` is the arguments we pass to the function, so when we call `post.byId.query(args)` our `args` will be our input, which we'll provide as query parameters or request body depending on the type of procedure. The `createRecursiveProxy` takes in a callback function which we'll map the `apply` to with the path and args.

Note that we can cast the above `unknown` proxy to whatever shape we want. In tRPC, this is done by extracting the type from the server and then doing some transformations to get a client type and then casting to that.