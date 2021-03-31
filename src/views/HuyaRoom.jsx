import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ReactPlayer from 'react-player'
import axios from '../api/ajax'
import DPlayer from 'dplayer'

const HuyaRoom = () => {
  const { id } = useParams()
  const [url, setUrl] = useState('')
  useEffect(() => {
    axios
      .get(`huya/url/${id}`)
      .then((data) => {
        data = data.data
        console.log(data)
        setUrl('https:' + data.data)

        const dp = new DPlayer({
          container: document.getElementById('dplayer'),
          live: true,
          autoplay: true,
          video: {
            url: 'https:' + data.data,
          },
        })
        dp.on('error', (err) => {
          console.log(err)
        })
      })
      .catch((e) => {
        alert(e.data)
      })
  }, [])
  return (
    <div>
      {/* <ReactPlayer
        url={url}
        // playing={true}
        controls={true}
        width={'100%'}
        height={'100%'}
        // onError={(error, data) => {
        //   // alert(error)
        //   console.log('error:' + error)
        //   console.log(data)
        // }}
      /> */}
      <div id="dplayer"></div>
    </div>
  )
}

export default HuyaRoom
