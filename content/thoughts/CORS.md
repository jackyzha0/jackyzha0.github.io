---
title: CORS
date: 2023-12-16
tags:
  - seed
---
Cross-Origin Resource Sharing (CORS) is an [[thoughts/HTTP|HTTP]]-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.

## Security model
For security reasons, browsers generally follow the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). This means that a web application using those APIs can only request resources from the same origin the application was loaded from unless the response from **other origins includes the right CORS headers**.

This is best illustrated with an example:

Say you visit `https://example.com` via a `GET` request. This initial request defines the **origin** of the request.
- The document requests other resources from the same-origin like an image at `https://example.com/image.png` or a stylesheet at `https://example.com/style.css`.
	- These would be allowed as they are from the same origin.
	- Two URLs have the same origin if the protocol, port (if specified), and host are the same for both.
- The document requests other resources from other origins (e.g. `https://another-page.org/page.html`).
	- This is subject to CORS as this request is considered cross-origin.
	- Then, the browser checks to see if the request is considered a **simple request**. A simple request must meet all the following conditions:
		- Be a `GET`, `HEAD` or `POST` request
		- Can only contain allowed headers, mainly: `Connection`, `User-Agent`, `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`, `Range`
		- If `Content-Type` is set, it must be one of `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`
		- ...and a [few other more obscure requirements](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests)
	- If the request is a simple request, there is no preflight check. And the request is sent as normal.
		- Your browser will automatically set the `Origin` header on the outgoing request. This cannot be spoofed/changed by any client-side code.
		- The cross-origin server must respond with a `Access-Control-Allow-Origin` header.
			- The browser then checks to see if the value of the header matches the origin.
				- `Access-Control-Allow-Origin: *` means that the resource can be accessed by any origin.
				- `Access-Control-Allow-Origin: https://example.com` means that the resource can _only_ be accessed when `https://example.com` is the origin.
			- If the origin doesn't match, the browser will raise a CORS failure. CORS failures result in errors but for security reasons, specifics about the error _are not available to JavaScript_.
			- If server doesn't send back `Access-Control-Allow-Origin`, then the browser will refrain from providing the response to the caller and raise a CORS failure.
	- If the request isn't a simple request, it must first send a **preflight** request to the server to see if the actual request is safe to send using the `OPTIONS` HTTP verb.
		- This `OPTIONS` request contains a bunch of metadata about the original request (that hasn't been sent yet) like what the HTTP method it uses, other headers it includes, etc.
		- Then, the server will respond with a few access control headers:
			- `Access-Control-Allow-Origin`
			- `Access-Control-Allow-Methods`
			- `Access-Control-Allow-Headers`
			- `Access-Control-Max-Age`: gives the value in seconds for how long the response to the preflight request can be cached without sending another preflight request
		- The browser then looks at the preflight response from the server and then chooses whether to send the actual request or not. Again, any failure here results in a CORS failure that is opaque to client-side Javascript.

> [!info]
> "What stops some actor from just not setting the `ORIGIN` header correctly? Wouldn't that invalidate CORS?"
> 
> CORS is a browser-level concept. Browsers are in control of setting the `Origin` header, and users can't override this value. So you won't see the `Origin` header spoofed from a browser. You can manually craft an HTTP request that bypasses these restrictions but keep in mind that CORS is not security.

### Abolish the same-origin policy

In a Web context, the user must be able to safely load any arbitrary URL, to safely click on any arbitrary link. The way in which this is achieved is that the runtime places strict limits on what a Web page can do. This puts stringent limits on the Web's ability to allow people to combine two services together, which in turn limits the Web's usefulness and prevents it from evolving an application architecture that is better than native apps.