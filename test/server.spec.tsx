import { describe, expect, it } from 'vitest'
import { isServer, renderToString } from 'solid-js/web'
import Markdown from '../src'

describe('environment', () => {
  it('runs on server', () => {
    expect(typeof window).toBe('undefined')
    expect(isServer).toBe(true)
  })
})

describe('Hello', () => {
  it('renders a hello component', () => {
    const string = renderToString(() => <Markdown>Test</Markdown>)
    expect(string).toMatchInlineSnapshot('"<p data-hk=\\"0-0-0-0-0\\" >Test</p>"')
  })
})
