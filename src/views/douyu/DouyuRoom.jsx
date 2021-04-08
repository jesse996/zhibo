import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ReactPlayer from 'react-player'
import axios from '../../api/ajax'

const DouyuRoom = () => {
  const { id } = useParams()
  const [url, setUrl] = useState('')
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    axios
      .get(`douyu/url/${id}`)
      .then((data) => {
        data = data.data
        console.log(data)
        setUrl(data)
      })
      .catch((e) => {
        console.log('ajax error:' + JSON.stringify(e))
        setIsError(true)
      })
  }, [])
  return (
    <div className="w-screen md:w-2/3  mx-auto h-screen">
      <div className="bg-gray-100 py-3 text-xl pl-3"> 斗鱼</div>

      {isError ? (
        <div>房间未开播</div>
      ) : (
        <ReactPlayer
          className=" relative max-h-screen mx-auto"
          url={url}
          playing={true}
          controls={true}
          width={'100'}
          height={'100'}
          onError={(error, data) => {
            console.log('react player error:' + error)
          }}
        />
      )}
    </div>
  )
}

export default DouyuRoom
