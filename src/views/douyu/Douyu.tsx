import { useEffect, useState } from 'react'
import React from 'react'
import axios from '../../api/ajax'
import { addRooms, setTotal } from './slice'
import { useAppDispatch, useAppSelector } from '../../hook'
import { CommonView } from '../../components/CommonView'
import { CommonResult } from '../../components/CommonResult'
import { PageInfo } from '../../components/PageInfo'

interface ResponsList {
  coverImg: string
  name: string
  playUrl: string
  rid: string
  title: string
}

const douyu = () => {
  let width = document.querySelector('body')!.offsetWidth
  let NUM_COLUMNS = 2
  if (width > 500) NUM_COLUMNS = 3

  let douyuData = useAppSelector((state) => state.douyu.liveRooms)
  const dispatch = useAppDispatch()

  let totalCount = useAppSelector((state) => state.douyu.total)
  const [rowCount, setRowCount] = useState(totalCount / NUM_COLUMNS)

  //初始化
  useEffect(() => {
    if (douyuData?.length === 0) loadMoreItems(0, 30)
  }, [douyuData])

  const isItemLoaded = (index: number) => {
    return !!douyuData[index]
  }

  const loadMoreItems = (startIndex: number, stopIndex: number) => {
    let SIZE = stopIndex - startIndex
    if (SIZE === 0) {
      return Promise.resolve()
    }
    let page = Math.floor(startIndex / SIZE) + 1
    return new Promise((resolve) => {
      axios
        .get('douyu', {
          params: {
            page: page,
            size: SIZE,
          },
        })
        .then((resp: CommonResult<PageInfo<ResponsList>>) => {
          let data = resp.data
          // setTotalCount(data.total)
          dispatch(setTotal(data.total))
          dispatch(addRooms({ start: startIndex, list: data.list }))
        })
        .catch((e) => {
          console.log(e)
        })
      resolve(true)
    })
  }

  useEffect(() => {
    setRowCount(totalCount / NUM_COLUMNS)
  }, [totalCount])

  return (
    <CommonView
      isItemLoaded={isItemLoaded}
      totalCount={totalCount}
      loadMoreItems={loadMoreItems}
      NUM_COLUMNS={NUM_COLUMNS}
      rowCount={rowCount}
      data={douyuData}
      title="斗鱼"
      urlName="douyu"
    ></CommonView>
  )
}

export default douyu
