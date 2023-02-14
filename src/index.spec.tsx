/// <reference types="vitest/globals"/>
import { render } from '@solidjs/testing-library'
import Markdown from './index'

test('can render the most basic of documents (single paragraph)', () => {
  const { asFragment, unmount } = render(() => <Markdown>Test</Markdown>)
  assert.equal(asFragment(), '<p>Test</p>')
  unmount()
})

describe('should warn when passed non-string children', () => {
  const errorSpy = vi.spyOn(console, 'warn').mockImplementation((message) => message)
  it('when passed constant number', () => {
    const { unmount } = render(() => <Markdown children={1} />)

    expect(errorSpy).toHaveReturnedWith(
      '[solid-markdown] Warning: please pass a string as `children` (not: `1`)'
    )
    unmount()
  })
  it('when passed HTMLElement', () => {
    const { unmount } = render(() => (
      <Markdown>
        <h1>heading</h1>
      </Markdown>
    ))

    expect(errorSpy).toHaveReturnedWith(
      '[solid-markdown] Warning: please pass a string as `children` (not: `[object HTMLHeadingElement]`)'
    )
    unmount()
  })
})

test('should no warn when pass `null` as children', () => {
  const { asFragment, unmount } = render(() => <Markdown children={null} />)

  assert.equal(asFragment(), '')
  unmount()
})

test('should no warn when pass `undefined` as children', () => {
  const { asFragment, unmount } = render(() => <Markdown children={null} />)

  assert.equal(asFragment(), '')
  unmount()
})

test('uses passed class for root component', () => {
  const { asFragment, unmount } = render(() => <Markdown class="md">Test</Markdown>)
  assert.equal(asFragment(), '<div class="md"><p>Test</p></div>')
  unmount()
})

test('should handle multiple paragraphs properly', () => {
  const input = 'Solid is awesome\nAnd so is markdown\n\nCombining = epic'
  const { asFragment, unmount } = render(() => <Markdown children={input} />)

  assert.equal(asFragment(), '<p>Solid is awesome\nAnd so is markdown</p>\n<p>Combining = epic</p>')
  unmount()
})

test('should handle multiline paragraphs properly (softbreak, paragraphs)', () => {
  const input = 'Solid is awesome\nAnd so is markdown  \nCombining = epic'
  const { asFragment, unmount } = render(() => <Markdown children={input} />)
  const actual = asFragment()

  assert.equal(actual, '<p>Solid is awesome\nAnd so is markdown<br>\nCombining = epic</p>')
  unmount()
})

test('should handle emphasis', () => {
  const input = 'Solid is _totally_ *awesome*'
  const { asFragment, unmount } = render(() => <Markdown children={input} />)

  assert.equal(asFragment(), '<p>Solid is <em>totally</em> <em>awesome</em></p>')
  unmount()
})

test('should handle bold/strong text', () => {
  const input = 'Solid is __totally__ **awesome**'
  const { asFragment, unmount } = render(() => <Markdown children={input} />)

  assert.equal(asFragment(), '<p>Solid is <strong>totally</strong> <strong>awesome</strong></p>')
  unmount()
})

test('should handle links without title attribute', () => {
  const input = 'This is [a link](https://espen.codes/) to Espen.Codes.'
  const { asFragment, unmount } = render(() => <Markdown children={input} />)
  assert.equal(
    asFragment(),
    '<p>This is <a href="https://espen.codes/">a link</a> to Espen.Codes.</p>'
  )
  unmount()
})

test('should handle links with title attribute', () => {
  const input = 'This is [a link](https://espen.codes/ "some title") to Espen.Codes.'
  const { asFragment, unmount } = render(() => <Markdown children={input} />)
  assert.equal(
    asFragment(),
    '<p>This is <a href="https://espen.codes/" title="some title">a link</a> to Espen.Codes.</p>'
  )
  unmount()
})

test('should handle links with uppercase protocol', () => {
  const input = 'This is [a link](HTTPS://ESPEN.CODES/) to Espen.Codes.'
  const { asFragment, unmount } = render(() => <Markdown children={input} />)
  assert.equal(
    asFragment(),
    '<p>This is <a href="HTTPS://ESPEN.CODES/">a link</a> to Espen.Codes.</p>'
  )
  unmount()
})
