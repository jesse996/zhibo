import { useCallback, useEffect, useState, forwardRef } from 'react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FixedSizeGrid as Grid } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import AutoSizer from 'react-virtualized-auto-sizer'
import axios from '../../api/ajax'
import { useDispatch } from 'react-redux'
import { addRooms, ResponseHuyaRoom, setTotal } from './slice'
import { useAppDispatch, useAppSelector } from '../../hook'
import { RootState } from '../../store'
import { CommonResult } from '../../components/CommonResult'
import { PageInfo } from '../../components/PageInfo'
import { CommonView } from '../../components/CommonView'

const huya = () => {
  let width = document.querySelector('body')!.offsetWidth

  let NUM_COLUMNS = 2
  if (width > 500) NUM_COLUMNS = 3

  let huyaData = useAppSelector((state) => state.huya.liveRooms)
  const dispatch = useAppDispatch()

  let totalCount: number = useAppSelector((state) => state.huya.total)
  const [rowCount, setRowCount] = useState(totalCount / NUM_COLUMNS)

  //初始化
  useEffect(() => {
    if (huyaData?.length === 0) loadMoreItems(0, 30)
  }, [huyaData])

  const isItemLoaded = (index: number) => {
    return !!huyaData[index]
  }

  const loadMoreItems = (startIndex: number, stopIndex: number) => {
    // let SIZE = stopIndex - startIndex
    console.log(`startIndex:${startIndex},stopIndex:${stopIndex}`)
    let SIZE = 120
    let page = Math.floor(startIndex / SIZE) + 1
    return new Promise((resolve) => {
      axios
        .get('huya', {
          params: {
            page: page,
            size: SIZE,
          },
        })
        .then((data: CommonResult<PageInfo<ResponseHuyaRoom>>) => {
          let pageInfo = data.data
          //请求完了，没数据了
          if (pageInfo.list.length === 0) return resolve(true)

          dispatch(setTotal(totalCount + pageInfo.list.length + 1))
          dispatch(addRooms({ start: startIndex, list: pageInfo.list }))
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
      data={huyaData}
      title="虎牙"
      urlName="huya"
      ridName="profileRoom"
      coverImgName="screenshot"
      nickname="nick"
      titleName="introduction"
    ></CommonView>
  )
}

export default huya
