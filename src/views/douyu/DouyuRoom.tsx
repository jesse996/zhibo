import { Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ReactPlayer from 'react-player'
import axios from '../../api/ajax'
import React from 'react'
import { CommonRoom } from '../../components/CommonRoom'

interface RouteParams {
  id: string
}

const DouyuRoom = () => {
  const { id } = useParams<RouteParams>()
  const [url, setUrl] = useState('')
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    axios
      .get(`douyu/url/${id}`)
      .then((data) => {
        data = data.data
        console.log(data)
        setUrl(data)

        axios.get(data).catch((e) => {
          //直播正在连线中
          console.log(e)
          setIsError(true)
          axios.delete(`douyu/${id}`).catch((e) => {
            console.log(e)
          })
        })
      })
      .catch((e) => {
        console.log('ajax error:' + JSON.stringify(e))
        setIsError(true)
      })
  }, [])
  return <CommonRoom url={url} isError={isError} />
}

export default DouyuRoom
