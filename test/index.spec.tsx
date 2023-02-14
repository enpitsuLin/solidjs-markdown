/// <reference types="vitest/globals"/>
import { render } from '@solidjs/testing-library'
import Markdown from '../src/index'

test('can render the most basic of documents (single paragraph)', () => {
  const { asFragment } = render(() => <Markdown>Test</Markdown>)
  assert.equal(asFragment(), '<p>Test</p>')
})

test('uses passed class for root component', () => {
  const { asFragment } = render(() => <Markdown class="md">Test</Markdown>)
  assert.equal(asFragment(), '<div class="md"><p>Test</p></div>')
})

describe('Specific children', () => {
  const errorSpy = vi.spyOn(console, 'warn').mockImplementation((message) => message)

  it('should warn when passed constant number', () => {
    render(() => <Markdown children={1} />)

    expect(errorSpy).toHaveReturnedWith(
      '[solid-markdown] Warning: please pass a string as `children` (not: `1`)'
    )
  })

  it('should warn when passed HTMLElement', () => {
    render(() => (
      <Markdown>
        <h1>heading</h1>
      </Markdown>
    ))

    expect(errorSpy).toHaveReturnedWith(
      '[solid-markdown] Warning: please pass a string as `children` (not: `[object HTMLHeadingElement]`)'
    )
  })

  it('should no warn when pass `null` as children', () => {
    const { asFragment } = render(() => <Markdown children={null} />)

    assert.equal(asFragment(), '')
  })

  it('should no warn when pass `undefined` as children', () => {
    const { asFragment } = render(() => <Markdown children={null} />)

    assert.equal(asFragment(), '')
  })
})

describe('Commonmark', () => {
  it('handle `italic` 1', () => {
    const { asFragment } = render(() => <Markdown children="*Italic*" />)
    assert.equal(asFragment(), '<p><em>Italic</em></p>')
  })
  it('handle `italic` 2', () => {
    const { asFragment } = render(() => <Markdown children="_Italic_" />)
    assert.equal(asFragment(), '<p><em>Italic</em></p>')
  })
  it('handle `bold` 1', () => {
    const { asFragment } = render(() => <Markdown children="**Bold**" />)
    assert.equal(asFragment(), '<p><strong>Bold</strong></p>')
  })
  it('handle `bold` 2', () => {
    const { asFragment } = render(() => <Markdown children="__Bold__" />)
    assert.equal(asFragment(), '<p><strong>Bold</strong></p>')
  })
  it('handle `heading 1` 1', () => {
    const { asFragment } = render(() => <Markdown children="# Heading 1" />)
    assert.equal(asFragment(), '<h1>Heading 1</h1>')
  })
  it('handle `heading 1` 2', () => {
    const { asFragment } = render(() => <Markdown children="Heading 1\n=========" />)
    assert.equal(asFragment(), '<h1>Heading 1</h1>')
  })
  it('handle `heading 2` 1', () => {
    const { asFragment } = render(() => <Markdown children="## Heading 2" />)
    assert.equal(asFragment(), '<h2>Heading 2</h2>')
  })
  it('handle `heading 2` 2', () => {
    const { asFragment } = render(() => <Markdown children="Heading 2\n---------" />)
    assert.equal(asFragment(), '<h2>Heading 2</h2>')
  })
  it('handle `link` 1', () => {
    const { asFragment } = render(() => <Markdown children="[Link](https://commonmark.org/)" />)
    assert.equal(asFragment(), '<p><a href="https://commonmark.org/">Link</a></p>')
  })
  it('handle `link` 2', () => {
    const { asFragment } = render(() => (
      <Markdown children="[Link][1]\n\n[1]: https://commonmark.org/" />
    ))
    assert.equal(asFragment(), '<p><a href="https://commonmark.org/">Link</a></p>')
  })

  it('handle `image` 1', () => {
    const input = '![Image](https://commonmark.org/help/images/favicon.png)'
    const { asFragment } = render(() => <Markdown children={input} />)
    assert.equal(
      asFragment(),
      '<p><img src="https://commonmark.org/help/images/favicon.png" alt="Image"></p>'
    )
  })
  it('handle `image` 2', () => {
    const input = '![Image][1]\n\n[1]: https://commonmark.org/help/images/favicon.png'
    const { asFragment } = render(() => <Markdown children={input} />)
    assert.equal(
      asFragment(),
      '<p><img src="https://commonmark.org/help/images/favicon.png" alt="Image"></p>'
    )
  })
  it('handle `blockquote`', () => {
    const { asFragment } = render(() => <Markdown children="> Blockquote" />)
    assert.equal(asFragment(), '<blockquote>\n<p>Blockquote</p>\n</blockquote>')
  })
  it('handle `unordered list` 1', () => {
    const input = '* List\n* List\n* List'
    const { asFragment } = render(() => <Markdown children={input} />)
    assert.equal(asFragment(), '<ul>\n<li>List</li>\n<li>List</li>\n<li>List</li>\n</ul>')
  })
  it('handle `unordered list` 2', () => {
    const input = '- List\n- List\n- List'
    const { asFragment } = render(() => <Markdown children={input} />)
    assert.equal(asFragment(), '<ul>\n<li>List</li>\n<li>List</li>\n<li>List</li>\n</ul>')
  })
  it('handle `ordered list` 1', () => {
    const input = '1. One\n2. Two\n3. Three'
    const { asFragment } = render(() => <Markdown children={input} />)
    assert.equal(asFragment(), '<ol>\n<li>One</li>\n<li>Two</li>\n<li>Three</li>\n</ol>')
  })
  it('handle `ordered list` 2', () => {
    const input = '1) One\n2) Two\n3) Three'
    const { asFragment } = render(() => <Markdown children={input} />)
    assert.equal(asFragment(), '<ol>\n<li>One</li>\n<li>Two</li>\n<li>Three</li>\n</ol>')
  })
  it('handle `horizontal rule` 1', () => {
    const input = 'Horizontal rule:\n\n---'
    const { asFragment } = render(() => <Markdown children={input} />)
    assert.equal(asFragment(), '<p>Horizontal rule:</p>\n<hr>')
  })
  it('handle `horizontal rule` 2', () => {
    const input = 'Horizontal rule:\n\n***'
    const { asFragment } = render(() => <Markdown children={input} />)
    assert.equal(asFragment(), '<p>Horizontal rule:</p>\n<hr>')
  })
  it('handle `inline code`', () => {
    const { asFragment } = render(() => <Markdown children="`Inline code` with backticks" />)
    assert.equal(asFragment(), '<p><code>Inline code</code> with backticks</p>')
  })
  it('handle `code block` 1', () => {
    const input = "```\n# code block\nprint '3 backticks or'\nprint 'indent 4 spaces'\n```"
    const { asFragment } = render(() => <Markdown children={input} />)
    assert.equal(
      asFragment(),
      `<pre><code># code block\nprint '3 backticks or'\nprint 'indent 4 spaces'\n</code></pre>`
    )
  })
  it.skip('handle `code block` 2 which did not implement by remark', () => {
    const input = "····# code block\n····print '3 backticks or'\n····print 'indent 4 spaces'"
    const { asFragment } = render(() => <Markdown children={input} />)
    assert.equal(
      asFragment(),
      `<pre><code># code block\nprint '3 backticks or'\nprint 'indent 4 spaces'\n</code></pre>`
    )
  })
})
