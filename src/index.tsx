import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { children, createMemo, mergeProps, ParentComponent, Show } from 'solid-js'
import { PluggableList, unified } from 'unified'
import { VFile } from 'vfile'

import rehypeFilter, { Options as FilterOptions } from './rehype-filter'

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

const SolidRemark: ParentComponent<Partial<SolidRemarkProps>> = (props) => {
  const options = mergeProps(defaults, props)

  const c = children(() => options.children)

  const hastNode = createMemo(() => {
    const processor = unified()
      .use(remarkParse)
      .use(options.remarkPlugins || [])
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
        <pre>{JSON.stringify(hastNode(), null, 2)}</pre>
      </div>
    </Show>
  )
}

export default SolidRemark
