/// <reference types="vitest/globals"/>
import { render } from '@solidjs/testing-library'
import Markdown from '../src/index'
import rehypePrismPlus from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'

test('rehype plugins', () => {
  const { asFragment } = render(() => (
    <Markdown rehypePlugins={[rehypePrismPlus]}>{'```javascript\nconst a = 1;```'}</Markdown>
  ))

  expect(asFragment()).toMatchInlineSnapshot(`
    "<pre class=\\"language-javascript\\"><code class=\\"language-javascript code-highlight\\"><span class=\\"code-line\\"><span class=\\"token keyword\\">const</span> a <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span><span class=\\"token template-string\\"><span class=\\"token template-punctuation string\\">\`</span><span class=\\"token template-punctuation string\\">\`</span></span>\`
    </span></code></pre>"
  `)
})

test('remark plugins', () => {
  const { asFragment } = render(() => (
    <Markdown remarkPlugins={[remarkGfm]}>{'- [ ] done thing\n- [x] undone thing'}</Markdown>
  ))

  expect(asFragment()).toMatchInlineSnapshot(`
    "<ul class=\\"contains-task-list\\">
    <li class=\\"task-list-item\\"><input type=\\"checkbox\\" disabled=\\"\\"> done thing</li>
    <li class=\\"task-list-item\\"><input type=\\"checkbox\\" disabled=\\"\\"> undone thing</li>
    </ul>"
  `)
})
