# Spec: Omni syntax theme for Pulsar

## Goal

Port Rocketseat's Omni theme (VS Code) to Pulsar as a syntax theme package
(`theme: "syntax"`). Scope is code coloring only, not the app chrome
(sidebar/tabs/statusbar) — that would require a separate UI theme package
per Pulsar's package.json contract (a package can only declare one theme
type).

## Source of truth

`../../references/visual-studio-code/src/omni.yml` — Omni's own palette and
`tokenColors` (TextMate scope -> color mapping). All color decisions here
trace back to that file.

## Palette

```
BG        #191622   FG      #E1E1E6   SELECTION #41414D
COMMENT   #5A4B81   CYAN    #988bc7   GREEN     #67e480
ORANGE    #E89E64   PINK    #FF79C6   PURPLE    #78D1E1
RED       #E96379   YELLOW  #e7de79
```

## Approach

Pulsar's own `one-dark-syntax` package
(`../../references/pulsar/packages/one-dark-syntax`) uses a `hue-N` /
`mono-N` variable scheme across `styles/syntax/*.less` (modern tree-sitter,
compound `.syntax--*` classes) and `styles/syntax-legacy/*.less` (TextMate
scopes). Reused that file structure almost verbatim and:

1. Aliased `hue-1..hue-6-2` / `mono-1..3` to Omni colors in
   `styles/colors.less`, following the closest semantic match between
   one-dark's hue roles and Omni's `tokenColors` roles (e.g. `hue-3`
   keywords -> `PINK`, since Omni colors `keyword` scopes `PINK`).
2. Hand-overrode specific scopes where Omni's `tokenColors` explicitly
   diverges from what the flat alias would produce (markdown bold/italic/
   heading/quote/raw, `variable.language` (this/self/super), HTML/CSS
   attribute names, CSS `#id` selectors). See inline comments at each edit
   site in `styles/syntax/base.less`, `styles/syntax/css.less`, and
   `styles/syntax-legacy/_base.less`.
3. `styles/editor.less` (background, gutter, cursor, guides, find/replace
   markers) and `styles/syntax-variables.less` (terminal ANSI colors) map
   directly to omni.yml's `editor.*` and `terminal.*` / `ansi` color blocks.

## Non-goals

- UI theme (sidebar, tabs, statusbar, activity bar) — out of scope per
  user decision (2026-08-21). Could be a follow-up `omni-pulsar-ui`
  package using `one-dark-ui` as its own template.
- Perfect 1:1 replication of every one of Omni's ~150 VS Code scopes.
  Pulsar's scope taxonomy (TextMate legacy + tree-sitter compound classes)
  doesn't line up 1:1 with VS Code's; mapped by closest semantic role
  instead of chasing exact scope-string parity.
