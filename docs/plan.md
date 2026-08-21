# Plan: Omni syntax theme for Pulsar

- [x] Read `omni.yml` (source palette + tokenColors) and `one-dark-syntax`
      (Pulsar syntax theme package structure) as templates.
- [x] `styles/colors.less` — Omni palette + hue-N/mono-N aliases.
- [x] `styles/syntax-variables.less` — official syntax vars + terminal ANSI,
      sourced from omni.yml's `editor.*`/`terminal.*`/`ansi` blocks.
- [x] `styles/editor.less` — copied from one-dark-syntax unchanged (already
      only references the vars above).
- [x] `styles/syntax/base.less`, `styles/syntax/css.less` (tree-sitter) and
      `styles/syntax-legacy/*.less` (TextMate) — copied from one-dark-syntax,
      spot-fixed where Omni's tokenColors explicitly diverge from the hue
      alias default.
- [x] `index.less` entry point, `package.json` (`theme: "syntax"`).
- [x] `icon.svg` — Omni's ring mark, purple instead of green.
- [x] `spec/theme-spec.js` — activation smoke test.
- [x] `README.md` (PT first, EN below), `LICENSE.md` (MIT, matches Omni's
      own license).
- [ ] `git init`, first commit, push to
      `git@github.com:romulofer/omni_pulsar.git` (branch `main`) — only on
      explicit user go-ahead, per repo-wide rule (never commit/push
      unannounced).
- [ ] `ppm link` into the user's local Pulsar for testing.
