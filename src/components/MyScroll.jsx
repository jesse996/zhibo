import BScroll from '@better-scroll/core'
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Pullup from '@better-scroll/pull-up'
import InfinityScroll from '@better-scroll/infinity'

// BScroll.use(InfinityScroll)
BScroll.use(Pullup)

const MyScroll = forwardRef((props, ref) => {
  const bsRef = useRef()
  const [bs, setBs] = useState()
  const { onPullingUp } = props

  useEffect(() => {
    let bs = new BScroll(bsRef.current, {
      click: true,
      specifiedIndexAsContent: 1,
      pullUpLoad: {
        threshold: -10,
      },
      // infinity: {
      //   fetch(count) {
      //     // 获取大于 count 数量的数据，该函数是异步的，它需要返回一个 Promise。
      //     // case 1. resolve 数据数组Array<data>，来告诉 infinity 渲染数据，render 的第一个参数就是数据项
      //     // case 2. resolve(false), 来停止无限滚动
      //     return new Promise((resolve, reject) => {
      //       resolve([1, 2, 3])
      //     })
      //   },
      //   render(item, div) {
      //     // item 是 fetch 函数提供的每一个数据项，
      //     // div 是页面回收的 DOM，可能不存在
      //     // 如果 div 不存在，你需要创建一个新的 HTMLElement 元素
      //     // 必须返回一个 HTMLElement
      //     return div
      //   },
      //   createTombstone() {
      //     // 必须返回一个墓碑 DOM 节点。
      //     return <div>空</div>
      //   },
      // },
    })
    setBs(bs)
    ref.current = bs
    // bs.refresh()
    return () => setBs(null)
  }, [])

  //上滑加载更多
  // useEffect(() => {
  //   bs?.on('pullingUp', () => {
  //     onPullingUp()
  //     bs.finishPullUp()
  //     bs.refresh()
  //   })
  // }, [bs, onPullingUp])

  // useEffect(() => {
  //   bs?.refresh()
  // })

  return (
    <div className="h-screen" ref={bsRef}>
      {props.children}
    </div>
  )
})

export default MyScroll
