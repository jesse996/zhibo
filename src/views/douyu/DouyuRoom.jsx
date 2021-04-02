import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ReactPlayer from 'react-player'
import axios from '../../api/ajax'
// import DPlayer from 'dplayer'

const DouyuRoom = () => {
  const { id } = useParams()
  const [url, setUrl] = useState('')
  useEffect(() => {
    axios
      .get(`douyu/url/${id}`)
      .then((data) => {
        data = data.data
        console.log(data)
        setUrl(data)

        //Dplayer
        // const dp = new DPlayer({
        //   container: document.getElementById('dplayer'),
        //   live: true,
        //   autoplay: true,
        //   video: {
        //     url: 'https:' + data.data,
        //   },
        // })
        // dp.on('error', (err) => {
        //   console.log(err)
        // })
      })
      .catch((e) => {
        console.log('ajax error:' + JSON.stringify(e))
      })
  }, [])
  return (
    <div>
      <ReactPlayer
        url={url}
        // muted={true}
        // playing={true}
        controls={true}
        width={'100'}
        height={'100'}
        onError={(error, data) => {
          // alert(error)
          console.log('react player error:' + error)
        }}
      />
      {/* <div id="dplayer"></div> */}
    </div>
  )
}

export default DouyuRoom
