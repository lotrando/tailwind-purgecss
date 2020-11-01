# Tailwind-purgecss

## Simple postcss, cssnano, purgecss autoprefixer vanilla project template

<h1 align="center">
  <img src="/dist/img/tailwind.png" alt="Tailwind logo" />
</h1>

## Installation
```
git clone https://github.com/lotrando/tailwind-master.git
```
in cloned project run ...
```
npm install
```
---
## Building tailwind css file

### Full big tailwind.css file for developing run

```
npm run tailwind:dev
```
and in index html edit css link.
```
<link rel="stylesheet" href="css/tailwind.css">
```

### Minimized purged tailwind.css file for production run

```
npm run tailwind:prod
```
and no edit css link in index html.
---
## Google fonts

In files `tailwind.config.js` and `src/tailwind.css` inject some Google fonts to tailwind.css.
