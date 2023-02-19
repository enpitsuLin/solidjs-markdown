<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solidjs-markdown&background=tiles&project=%20" alt="solidjs-markdown">
</p>

# solidjs-markdown

Solidjs component to render markdown.

## Quick start

**Notice**: This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

Install it with node:

```bash
npm i solidjs-markdown
# or
yarn add solidjs-markdown
# or
pnpm add solidjs-markdown
```

In Deno with `esm.sh`:

```bash
import SolidjsMarkdown from 'https://esm.sh/solidjs-markdown'
```

In broswer with `esm.sh`

```html
<script type="module">
  import SolidjsMarkdown from 'https://esm.sh/solidjs-markdown?bundle'
</script>
```

## Usage

```tsx
import SolidjsMarkdown from 'solidjs-markdown'
import { render } from 'solid-js/web'

render(() => <SolidjsMarkdown># Hello, *world*!</SolidjsMarkdown>, document.querySelector('#app'))
```

<details open="">
<summary>Show equivalent JSX</summary>

```jsx
<h1>
  Hello, <em>world</em>!
</h1>
```

</details>

## License

[MIT](https://github.com/enpitsuLin/solidjs-markdown/blob/HEAD/LICENSE) © [enpitsuLin](https://github.com/enpitsuLin)
