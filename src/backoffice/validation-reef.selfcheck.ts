// validation-reef.selfcheck.ts - verifie les refus editoriaux avant toute ecriture GitHub.
import assert from "node:assert/strict";
import { validerReef } from "./validation-reef.ts";
import { identifiantValide, verifierConfiguration } from "./contrat.ts";

const refs = { auteurs: ["it/lea"], sujets: ["it/design"], images: ["../../../assets/covers/a.webp"] };
const fiche = { title: "Article", description: "Description", pubDate: "2026-09-15", author: "it/lea", topic: "it/design", draft: true };
assert.deepEqual(validerReef(fiche, "Corps", "it", refs), []);
assert.deepEqual(validerReef({ ...fiche, author: "en/lea" }, "Corps", "it", refs), ["author"]);
assert.deepEqual(validerReef({ ...fiche, topic: "it/absent" }, "Corps", "it", refs), ["topic"]);
assert.deepEqual(validerReef({ ...fiche, cover: "../../secret" }, "Corps", "it", refs), ["cover", "coverAlt"]);
assert.deepEqual(validerReef({ ...fiche, pubDate: "invalide" }, "Corps", "it", refs), ["pubDate"]);
assert.deepEqual(validerReef({ ...fiche, tags: [1] }, "Corps", "it", refs), ["tags"]);
assert.deepEqual(validerReef({ ...fiche, draft: "false" }, "Corps", "it", refs), ["draft"]);
assert.deepEqual(validerReef(fiche, "", "it", refs), ["body"]);
assert.equal(identifiantValide("../autre-site"), false);
assert.equal(identifiantValide("article-francais"), true);
assert.throws(() => verifierConfiguration({ id: "reef", depot: "owner/repo", branche: "main", dossierArticles: "../secret", dossierAuteurs: "auteurs", dossierSujets: "sujets", dossierImages: "images", format: "reef", langues: ["it"] }));
console.log("11 controles editoriaux passent : references, contenu, types et chemins.");
