#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const notePath = process.argv[2];

if (!notePath) {
  console.error('Usage: node tools/sync-photo-notes.mjs "Photo Notes/2024 Ecuador.md"');
  process.exit(1);
}

const absNotePath = join(root, notePath);
if (!existsSync(absNotePath)) {
  console.error(`Note file not found: ${notePath}`);
  process.exit(1);
}

const markdown = readFileSync(absNotePath, 'utf8').replace(/\r\n/g, '\n');
const folderMatch = markdown.match(/^---\n([\s\S]*?)\n---\n/);
if (!folderMatch) {
  console.error('Missing frontmatter. Add a top block like: ---\\nfolder: 2024 Ecuador\\n---');
  process.exit(1);
}

const folder = (folderMatch[1].match(/^folder:\s*(.+)$/m) || [])[1]?.trim();
if (!folder) {
  console.error('Missing `folder:` in frontmatter.');
  process.exit(1);
}

function sectionText(title) {
  const lines = markdown.split('\n');
  const heading = `## ${title}`;
  const start = lines.findIndex((line) => line.trim() === heading);
  if (start < 0) return '';
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i])) {
      end = i;
      break;
    }
  }
  return lines.slice(start + 1, end).join('\n').trim();
}

function cleanCaption(text) {
  return text
    .split('\n')
    .filter((line) => !line.trim().startsWith('!['))
    .filter((line) => !line.trim().startsWith('<!--'))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const intro = sectionText('Intro');
const introEn = sectionText('Intro EN') || sectionText('Intro English');
const captionsBlock = sectionText('Captions');
const captions = {};

let currentFilename = '';
let currentLines = [];
function flushCaption() {
  if (!currentFilename) return;
  const caption = cleanCaption(currentLines.join('\n'));
  if (caption) captions[currentFilename] = caption;
}

for (const line of captionsBlock.split('\n')) {
  const heading = line.match(/^###\s+(.+?)\s*$/);
  if (heading) {
    flushCaption();
    currentFilename = heading[1].trim();
    currentLines = [];
  } else if (currentFilename) {
    currentLines.push(line);
  }
}
flushCaption();

const manifestPath = join(root, 'Photos', folder, '_order.json');
let manifest = { version: 4 };
if (existsSync(manifestPath)) {
  manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
}

manifest.version = Math.max(4, Number(manifest.version) || 0);
if (intro) manifest.intro = intro;
if (introEn) manifest.intro_en = introEn;
manifest.captions = captions;

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

console.log(`Synced ${Object.keys(captions).length} captions to Photos/${folder}/_order.json`);
