# Tailwind-purgecss

### postcss, cssnano, purgecss autoprefixer vanilla project template

In files

`tailwind.config.js` and `src/tailwind.css`

added some Google fonts to demostrate add some custom css to tailwind

## Installation

```
git clone https://github.com/lotrando/tailwind-master.git
```

in cloned project run ...

```
npm install
```

## Building tailwind css file

### For full big tailwind.css file run

```
npm run npx:dev
```

and in index html edit css link.

```
<link rel="stylesheet" href="css/tailwind.css">
```

### For minimized purged tailwind.css file run

```mermaid
npm run postcss:dev
```

and no edit css link in index html.
