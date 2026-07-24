# Blog Audit — Redundancy & Merge Plan

Goal: fewer, deeper, more technical posts. Cut generic intro/pep-talk pages, fold motivation into the first real technical post of each series.

Current: 9 posts across 2 series + 1 standalone.

## Bit Manipulation (3 → 2, or 2 → 1 with deep merge)

| Post                                                    | Words | Verdict                                                                                                  |
| ------------------------------------------------------- | ----- | -------------------------------------------------------------------------------------------------------- |
| `let-me-answer-why-bit-manipulation`                    | 758   | **Filler.** Pure motivation ("overcoming mental barrier", "embarking on journey"). No technical content. |
| `getting-started-...-the-basics`                        | 1645  | Number systems, binary, decimal↔binary conversion.                                                       |
| `exploring-binary-arithmetic-and-memory-representation` | 2624  | Bits/bytes, arithmetic, complements, 2s complement, signed ints.                                         |

Actions:

- **Merge `why-bit-manipulation` → `getting-started`** as a short opening section. Not worth a standalone post.
- **Overlap:** `getting-started` and `exploring-binary-arithmetic` both cover "how numbers are represented in binary". Optional deep merge into one authoritative post — _"Binary, Arithmetic & Memory Representation"_ (~3500w after dedup). Basics alone too thin to stand.

## ThreeJS Journey (5 → 4)

| Post                                                 | Words | Verdict                                                                           |
| ---------------------------------------------------- | ----- | --------------------------------------------------------------------------------- |
| `introduction-to-series-three-js-journey`            | 1241  | **Meta filler.** "Why this blog / Who am I / How to get involved." Not technical. |
| `into-the-3rd-dimension-build-your-first-3d-project` | 2743  | "Meet Three.js" + favorite projects + ABCs + setup.                               |
| `building-sci-fi-mystery-box-...-textures`           | 2504  | Keep.                                                                             |
| `achieving-photorealism-...`                         | 3760  | Keep.                                                                             |
| `building-an-infinite-particle-background-...`       | 1967  | Keep.                                                                             |

Actions:

- **Merge `introduction-to-series` → `into-the-3rd-dimension`**. Both open with "why/meet Three.js". Who-am-I / how-to-involve belongs on an about page or a 2-paragraph preamble, not a whole post.

## Standalone

- `zero-the-number-that-isnt-a-number-or-its-it` (2927w) — no series, no overlap. **Leave as is.**

## Net result

- Kill 2 generic intro posts (`why-bit-manipulation`, `introduction-to-series`); fold motivation into first technical post of each series.
- Optional deeper merge fuses the two bit-basics posts.
- **9 → 6** (or 7 if bit basics stay split).

## Status — DONE (bit + three.js intro folds)

- ✅ `why-bit-manipulation` folded into `getting-started` as "Why am I starting with bit manipulation?"; file + dir deleted.
- ✅ `introduction-to-series` folded into `into-the-3rd-dimension` as "Why this series, and who's writing it?"; file + dir deleted.
- ✅ `posts.js` trimmed to 7 entries; `blogNo` renumbered 1–7 gapless by date; merged-post readtimes bumped (three.js 15→18 min, bit 9→12 min).
- ✅ All 7 mdx `blogNo` frontmatter re-synced to posts.js. No dangling slug refs.
- ⏳ **Not done (optional):** deep merge of the two bit-basics posts (`getting-started` + `exploring-binary-arithmetic`) into one authoritative binary/memory post. Left split for now → **7 posts**.
- Voice preserved: folded text is Sahil's own sentences (trimmed of repetition), not AI-generated prose.
