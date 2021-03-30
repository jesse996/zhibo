import BScroll from '@better-scroll/core'
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Pullup from '@better-scroll/pull-up'

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
    })
    setBs(bs)
    ref.current = bs
    // bs.refresh()
    return () => setBs(null)
  }, [])

  //上滑加载更多
  useEffect(() => {
    bs?.on('pullingUp', () => {
      onPullingUp()
      bs.finishPullUp()
      bs.refresh()
    })
  }, [bs, onPullingUp])

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
