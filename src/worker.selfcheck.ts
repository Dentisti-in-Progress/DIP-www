// src/worker.selfcheck.ts - erreurs de cookies, langues et routage, sans reseau.
import assert from "node:assert/strict";
import worker from "./worker.ts";

const env = { ASSETS: { fetch: async () => new Response("asset", { status: 200 }) } };
const cases: [string, Record<string, string>, number, string | null][] = [
  ["/", {}, 200, null],
  ["/", { "Accept-Language": "en" }, 302, "/en/"],
  ["/about/?ref=test", { "Accept-Language": "en" }, 302, "/en/about/?ref=test"],
  ["/", { "Accept-Language": "en;q=0" }, 200, null],
  ["/", { "Accept-Language": "en;q=-1,it;q=0.5" }, 200, null],
  ["/", { "Accept-Language": "en;q=2,it;q=0.5" }, 200, null],
  ["/", { "Accept-Language": "en;q=no,it;q=0.5" }, 200, null],
  ["/", { "Accept-Language": "en;q=0.5,en;q=0.9" }, 302, "/en/"],
  ["/", { Cookie: "aloha_locale=it", "Accept-Language": "en" }, 200, null],
  ["/", { Cookie: "aloha_locale=en", "Accept-Language": "it" }, 302, "/en/"],
  ["/", { Cookie: "aloha_locale=%69%74" }, 200, null],
  ["/", { Cookie: "aloha_locale=%E0%A4%A", "Accept-Language": "en" }, 302, "/en/"],
  ["/", { Cookie: "aloha_locale=%", "Accept-Language": "en" }, 302, "/en/"],
  ["/", { Cookie: "unrelated=%; aloha_locale=it" }, 200, null],
  ["/en/about/", { "Accept-Language": "en" }, 200, null],
  ["/favicon.ico", { "Accept-Language": "en" }, 200, null],
];
for (const [path, headers, status, location] of cases) {
  const response = await worker.fetch(new Request("https://example.com" + path, { headers }), env);
  assert.equal(response.status, status, JSON.stringify({ path, headers }));
  assert.equal(response.headers.get("Location"), location);
  if (status === 302) {
    assert.equal(response.headers.get("Cache-Control"), "no-store");
    assert.equal(response.headers.get("Vary"), "Accept-Language, Cookie");
  }
}
const post = await worker.fetch(new Request("https://example.com/", {
  method: "POST", headers: { "Accept-Language": "en" },
}), env);
assert.equal(post.status, 200);
let demoAuthCalls = 0;
const demoEnv = { ...env, ALOHA_DEMO_BACKOFFICE: "1", ALOHA_AUTH: { async fetch() { demoAuthCalls++; return Response.json({ authenticated: true, role: "admin" }); } } };
for (const path of ["/api/editorial/en/test", "/api/editorial-categories/en/test", "/api/auth/verify", "/%61pi/editorial/en/test", "/api%2Feditorial/en/test"]) {
  const response = await worker.fetch(new Request("https://example.com" + path, { method: "POST", body: "{}" }), demoEnv);
  assert.equal(response.status, 403); assert.equal((await response.json() as { error: string }).error, "demo_read_only");
}
assert.equal(demoAuthCalls, 0);
assert.equal((await worker.fetch(new Request("https://example.com/en/secret-spot/"), demoEnv)).status, 200);
assert.equal((await worker.fetch(new Request("https://example.com/secret-spot/build.json"), demoEnv)).status, 404);
console.log("Routage et demonstration en lecture seule verifies, meme avec un service de connexion present.");
