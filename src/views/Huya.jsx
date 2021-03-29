import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MyScroll from '../components/MyScroll'

const Huya = () => {
  const [huyaData, setHuyaData] = useState([])
  useEffect(() => {
    axios.get('http://10.113.219.204:8080/huya').then(({ data }) => {
      data = data.data
      data.list = data.list.map((i) => ({ ...i, href: i.href.substring(21) }))
      // console.log(data.list)
      setHuyaData(data.list)
    })
  }, [])
  return (
    <MyScroll>
      <div className="h-12 relative">
        <div className="bg-blue-400 text-white px-2 py-3 text-xl z-50 absolute inset-0 ">
          虎牙
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 mt-1">
        {huyaData.map((i) => {
          return (
            <div className="bg-blue-200 text-center h-40" key={i.id}>
              <Link to={`/huya/${i.href}`}>
                <img src={i.pic}></img>
                <div className="flex">
                  <div className="text-sm">{i.name}</div>
                  <div>{i.title}</div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </MyScroll>
  )
}

export default Huya
