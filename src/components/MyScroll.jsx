import BScroll from '@better-scroll/core'
import { useEffect, useRef } from 'react'

const MyScroll = (props) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    let bs = new BScroll('.wrapper', {
      click: true,
      specifiedIndexAsContent: 1,
      // ...... 详见配置项
      // probeType: 3,
    })
  })
  return (
    <div ref={scrollRef} className="wrapper h-screen">
      {props.children}
    </div>
  )
}

export default MyScroll
