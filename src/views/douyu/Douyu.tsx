import { useCallback, useEffect, useState, forwardRef } from 'react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FixedSizeGrid as Grid } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import AutoSizer from 'react-virtualized-auto-sizer'
import axios from '../../api/ajax'
import { useDispatch } from 'react-redux'
import { addRooms, setTotal } from './slice'
import { useAppDispatch, useAppSelector } from '../../hook'
import { RootState } from '../../store'
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
      ridName="rid"
      coverImgName="coverName"
      nickname="name"
      titleName="title"
    ></CommonView>
  )
}

export default douyu
