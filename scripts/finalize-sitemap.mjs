import { access, readdir, rename, rm } from 'node:fs/promises';

const distDirectory = new URL('../dist/', import.meta.url);
const sitemapIndex = new URL('sitemap-index.xml', distDirectory);
const generatedSitemap = new URL('sitemap-0.xml', distDirectory);
const finalSitemap = new URL('sitemap.xml', distDirectory);

const generatedFiles = (await readdir(distDirectory)).filter((file) => /^sitemap-\d+\.xml$/.test(file));

if (generatedFiles.length !== 1 || generatedFiles[0] !== 'sitemap-0.xml') {
  throw new Error(`Expected exactly one generated sitemap file, found: ${generatedFiles.join(', ') || 'none'}`);
}

await rm(finalSitemap, { force: true });
await rename(generatedSitemap, finalSitemap);
await rm(sitemapIndex, { force: true });

await access(finalSitemap);
console.log('Created dist/sitemap.xml');
