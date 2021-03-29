import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ReactPlayer from 'react-player'
import axios from 'axios'
// import DPlayer from 'dplayer'

const HuyaRoom = () => {
  const { id } = useParams()
  const [url, setUrl] = useState('')
  useEffect(() => {
    axios.get(`http://10.113.219.204:8080/huya/url/${id}`).then(({ data }) => {
      console.log(data)
      if (data.code === 0) {
        alert('请求错误！')
        return
      }
      data = data.data
      console.log(data)
      setUrl('https:' + data.data)
      // const dp = new DPlayer({
      //   container: document.getElementById('dplayer'),
      //   live: true,
      //   autoplay: true,
      //   video: {
      //     url: 'https:' + data.data,
      //   },
      // })
    })
  }, [])
  return (
    <div>
      {/* id:{id} */}
      <ReactPlayer
        url={url}
        playing={true}
        controls={true}
        width={'100%'}
        height={'100%'}
      />
      {/* <div id="dplayer"></div> */}
    </div>
  )
}

export default HuyaRoom
