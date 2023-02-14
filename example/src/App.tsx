import Markdown from 'solidjs-markdown'
export function App() {
  const markdown = `
  *Emphasis 1*

  _Emphasis 2_

  # heading 1
  
  ## heading 2

  [Link](http://a.com)

  [Link][1]

  [1]: http://b.org

  ![Image](http://url/a.png)

  ![Image][1]

  [2]: http://url/b.jpg

  > Blockquote

  * List
  * List
  * List

  - List
  - List
  - List

  1. One
  2. Two
  3. Three

  1) One
  2) Two
  3) Three

  Horizontal rule:

  ---

  Horizontal rule:

  ***

  \`Inline code\` with backticks

  \`\`\`
  # code block
  print '3 backticks or'
  print 'indent 4 spaces'
  \`\`\`
  `
  return <Markdown>{markdown}</Markdown>
}
