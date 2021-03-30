import { useCallback, useEffect, useRef, useState } from 'react'
import axios from '../api/ajax'
import { Link } from 'react-router-dom'
import MyScroll from '../components/MyScroll'
import { useDispatch, useSelector } from 'react-redux'
import { addRooms, setY } from './huyaSlice'

const Huya = () => {
  let huyaData = useSelector((state) => state.huya.liveRooms)
  const dispatch = useDispatch()
  const bsRef = useRef()
  const Y = useSelector((state) => state.huya.y)

  useEffect(() => {
    if (huyaData?.length === 0) onPullingUp()
    bsRef.current?.scrollTo(0, Y, 0)
  }, [])

  const onPullingUp = () => {
    // console.log('---- pulling up ----')
    let count = huyaData.length
    let SIZE = 20 //每页默认20个
    let page = count / SIZE
    axios
      .get('huya', {
        params: {
          page: page + 1,
          size: SIZE,
        },
      })
      .then((data) => {
        data = data.data
        data.list = data.list.map((i) => ({ ...i, href: i.href.substring(21) }))
        dispatch(addRooms(data.list))
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const saveY = () => {
    console.log('y:', bsRef.current)
    dispatch(setY(bsRef.current.y))
    return false
  }
  return (
    <MyScroll onPullingUp={onPullingUp} ref={bsRef}>
      <div className="h-12 relative">
        <div className="bg-blue-400 text-white px-2 py-3 text-xl z-50 absolute inset-0 ">
          虎牙
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 mt-1 md:grid-cols-3 lg:grid-cols-4 auto-cols-fr">
        {[...huyaData].map((i, index) => {
          return (
            // <Link to={`/huya/${i.href}`} key={i.id}>
            <div className="bg-blue-200 flex   flex-col" key={index}>
              <Link to={`/huya/${i.href}`} onClick={saveY}>
                <img src={i.pic} className="h-30 "></img>
                <div className="flex-grow ">
                  <div className="text-sm">{i.name}</div>
                  <div className="text-sm">{i.title}</div>
                </div>
              </Link>
            </div>
            // </Link>
          )
        })}
        {/* <div className="h-10 text-center col-span-2 py-20">返回顶部</div> */}
      </div>
      {/* <div className="h-10 text-center col-span-2">返回顶部</div> */}
    </MyScroll>
  )
}

export default Huya
