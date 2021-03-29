import { useCallback, useEffect, useState } from 'react'
import axios from '../api/ajax'
import { Link } from 'react-router-dom'
import MyScroll from '../components/MyScroll'

const Huya = () => {
  const [huyaData, setHuyaData] = useState([])
  useEffect(() => {
    axios
      .get('huya')
      .then((data) => {
        data = data.data
        data.list = data.list.map((i) => ({ ...i, href: i.href.substring(21) }))
        // console.log(data.list)
        setHuyaData(data.list)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])
  const onScrollEnd = useCallback(() => {})
  return (
    <MyScroll onScrollEnd={onScrollEnd}>
      <div className="h-12 relative">
        <div className="bg-blue-400 text-white px-2 py-3 text-xl z-50 absolute inset-0 ">
          虎牙
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 mt-1 md:grid-cols-3 lg:grid-cols-4 auto-cols-fr">
        {huyaData.map((i) => {
          return (
            // <Link to={`/huya/${i.href}`} key={i.id}>
            <div className="bg-blue-200 flex   flex-col" key={i.id}>
              <Link to={`/huya/${i.href}`}>
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
      </div>
    </MyScroll>
  )
}

export default Huya
