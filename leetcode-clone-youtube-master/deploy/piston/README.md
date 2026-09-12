# Self-hosting Piston

This app calls out to a [Piston](https://github.com/engineer-man/piston) instance to compile
and run Python/Java/C++ submissions (`pages/api/execute.ts`). The public `emkc.org` Piston API
is **not usable at all any more** — as of 2026-02-15 it's whitelist-only and returns HTTP 401
for unlisted callers (confirmed while building this integration; see their "Important Note" at
https://github.com/engineer-man/piston#public-api for how to request whitelisting). You need
your own instance either way.

Piston does its sandboxing via Linux `isolate` (cgroups/namespaces), so it needs a **real Linux
Docker host** — Windows/WSL2 does not support this reliably. A free option that works well is an
[Oracle Cloud Always Free](https://www.oracle.com/cloud/free/) VM (Ubuntu, ARM or AMD), but any
Linux box with Docker works.

## Deploy

```bash
cd deploy/piston
docker compose up -d
```

## Install language runtimes

Piston ships with no languages installed by default. Install them through its own HTTP API
(there's no `cli.js`/`ppman` inside the `ghcr.io/engineer-man/piston` image — that's an older/
different distribution method; the API container manages packages over HTTP):

```bash
# See what's available (fetches Piston's package index from GitHub — the container needs
# real outbound internet access to *.githubusercontent.com for this to work; a restrictive
# egress firewall or proxy will make this hang or fail)
curl http://localhost:2000/api/v2/packages

# Install each language (repeat with the exact "language" and "language_version" from the list above)
curl -X POST http://localhost:2000/api/v2/packages -H "Content-Type: application/json" \
  -d '{"language":"python","version":"<version from /api/v2/packages>"}'
curl -X POST http://localhost:2000/api/v2/packages -H "Content-Type: application/json" \
  -d '{"language":"java","version":"<version from /api/v2/packages>"}'
curl -X POST http://localhost:2000/api/v2/packages -H "Content-Type: application/json" \
  -d '{"language":"cpp","version":"<version from /api/v2/packages>"}'
```

If `GET /api/v2/packages` hangs or the container logs show `ECONNREFUSED` to a
`githubusercontent.com` IP, the host's network (firewall, corporate proxy, sandboxed dev
environment, etc.) is blocking that egress — this is a networking issue on your host, not
something wrong with Piston or this app's integration.

## Verify

```bash
curl http://localhost:2000/api/v2/runtimes
```

Confirm `python`, `java`, and `cpp` (some Piston package versions expose C++ as `c++` instead —
check the `language` field returned here) show up with real version strings. If the C++ id
differs from `"cpp"`, update the language-id mapping in `pages/api/execute.ts` to match.

## Point the app at it

Set in `.env.local` (server-only — never expose this to the browser):

```
PISTON_API_URL=http://<your-host>:2000
```

## Security notes

- Piston has **no built-in authentication**. Anyone who can reach port 2000 can run arbitrary
  code on your box. Either put it behind a firewall/security-list rule that only allows your
  app server's IP, or put a reverse proxy with auth in front of it.
- Only `pages/api/execute.ts` (a server-only Next.js API route) should ever hold the real
  `PISTON_API_URL` — it is never sent to the browser.
- Open port 2000 in your cloud provider's firewall/security-list (e.g. Oracle Cloud blocks all
  ingress by default — you'll need to add an ingress rule).
