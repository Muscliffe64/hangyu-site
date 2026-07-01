# Photo Notes Workflow

This folder is for writing photo captions directly in Cursor.

Use one Markdown file per album. Keep the `folder:` value exactly the same as the matching `Photos/...` directory name.

Recommended flow:

1. Open the album note file in Cursor.
2. Write the Chinese album intro under `## Intro`.
3. Write the English album intro under `## Intro EN`.
4. Write each photo caption under its `### filename.jpg` heading.
4. Ask Codex to sync that note file into the website.

You do not need to export JSON manually. Codex can merge the Markdown text into `Photos/<folder>/_order.json`, which is what the website reads.

To sync manually from Cursor's terminal:

```sh
node tools/sync-photo-notes.mjs "Photo Notes/2024 Ecuador.md"
```

Caption format:

```md
---
folder: 2024 Example
---

## Intro

Chinese album intro here.

## Intro EN

English album intro here.

## Captions

### photo-name.jpg

![photo-name.jpg](../Photos/2024%20Example/photo-name.jpg)

Caption text here. Blank lines become separate paragraphs in the lightbox.
```
