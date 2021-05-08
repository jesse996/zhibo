import { Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ReactPlayer from 'react-player'
import axios from '../../api/ajax'
import React from 'react'
import { CommonResult } from '../../components/CommonResult'
import { PageInfo } from '../../components/PageInfo'
import { ResponseHuyaUrl } from './slice'
import { CommonRoom } from '../../components/CommonRoom'

interface RouteParams {
  id: string
}

const HuyaRoom = () => {
  const { id } = useParams<RouteParams>()
  const [url, setUrl] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    axios
      .get(`huya/url/${id}`)
      .then((data: CommonResult<ResponseHuyaUrl>) => {
        let resp = data.data
        console.log(resp)
        setUrl(resp.url)
      })
      .catch((e) => {
        console.log('ajax error:' + JSON.stringify(e))
        setIsError(true)
      })
  }, [])

  return <CommonRoom url={url} isError={isError} />
}

export default HuyaRoom
