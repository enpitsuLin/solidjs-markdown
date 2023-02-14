import type { Root } from 'hast'
import { toJsxRuntime, type Options as hastToJsxOptions } from 'hast-util-to-jsx-runtime'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { children, createMemo, ParentComponent, Show } from 'solid-js'
import { Fragment, jsx, jsxs } from 'solid-jsx'
import { Dynamic } from 'solid-js/web'
import { PluggableList, Processor, unified } from 'unified'
import { VFile } from 'vfile'

type SolidRemarkProps = {
  remarkPlugins?: PluggableList
  rehypePlugins?: PluggableList
  class?: string
}

const astToElement = (ast: Root) => {
  const options = {
    Fragment,
    jsx,
    jsxs,
    elementAttributeNameCase: 'html',
    stylePropertyNameCase: 'css',
  } as unknown as hastToJsxOptions
  return toJsxRuntime(ast, options)
}

const SolidRemark: ParentComponent<Partial<SolidRemarkProps>> = (props) => {
  const c = children(() => props.children)

  const hastNode = createMemo(() => {
    const processor = unified()
      .use(remarkParse)
      .use(props.remarkPlugins || [])
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(props.rehypePlugins || []) as Processor<Root, Root, Root, void>

    const file = new VFile()

    if (typeof c() === 'string') {
      file.value = c() as string
    } else if (c() !== undefined && props.children !== null) {
      console.warn(
        `[solid-markdown] Warning: please pass a string as \`children\` (not: \`${c()}\`)`
      )
    }

    const hastNode = processor.runSync(processor.parse(file), file)

    if (hastNode.type !== 'root') {
      throw new TypeError('Expected a `root` node')
    }

    return hastNode
  })
  return (
    <Show when={hastNode().type === 'root'}>
      <Dynamic component={props.class ? 'div' : Fragment} class={props.class}>
        {astToElement(hastNode())}
      </Dynamic>
    </Show>
  )
}

export default SolidRemark
