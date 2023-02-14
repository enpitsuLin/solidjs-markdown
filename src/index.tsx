import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { children, createMemo, mergeProps, ParentComponent, Show } from 'solid-js'
import { PluggableList, unified } from 'unified'
import { VFile } from 'vfile'
import { toJsxRuntime, type Options as hastToJsxOptions } from 'hast-util-to-jsx-runtime'
import { Fragment, jsx, jsxs } from 'solid-jsx'
import rehypeFilter, { Options as FilterOptions } from './rehype-filter'
import type { Root } from 'hast'
import remarkGfm from 'remark-gfm'

type PluginOptions = {
  remarkPlugins: PluggableList
  rehypePlugins: PluggableList
}

type LayoutOptions = {
  class: string
}

type SolidRemarkProps = PluginOptions & LayoutOptions & FilterOptions

const defaults: SolidRemarkProps = {
  remarkPlugins: [],
  rehypePlugins: [],

  unwrapDisallowed: false,
  disallowedElements: undefined,
  allowedElements: undefined,
  allowElement: undefined,
  class: '',
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
  const options = mergeProps(defaults, props)

  const c = children(() => options.children)

  const hastNode = createMemo(() => {
    const processor = unified()
      .use(remarkParse)
      .use(options.remarkPlugins || [])
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(options.rehypePlugins || [])
      .use(rehypeFilter, options)

    const file = new VFile()

    if (typeof c() === 'string') {
      file.value = c() as string
    } else if (c() !== undefined && options.children !== null) {
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
      <div class={options.class}>
        <div>{astToElement(hastNode())}</div>
      </div>
    </Show>
  )
}

export default SolidRemark
