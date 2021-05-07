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

  const Cell = (props: any) => {
    const { columnIndex, rowIndex, style } = props
    const itemIndex = rowIndex * NUM_COLUMNS + columnIndex

    const i = huyaData[itemIndex] || {}

    return (
      <div
        className="flex flex-col  items-center"
        key={itemIndex}
        style={style}
      >
        <Link
          to={`/huya/${i.profileRoom}`}
          className="flex flex-col justify-center  items-start w-44 "
        >
          <img src={i.screenshot} className="h-32 w-44"></img>
          <div className="flex flex-col">
            <div className="text-sm">{i.nick}</div>
            <div className="text-sm">{i.introduction}</div>
          </div>
        </Link>
      </div>
    )
  }

  const innerElementType = forwardRef<any, any>(({ style, ...rest }, ref) => (
    <div
      ref={ref}
      style={{
        ...style,
        position: 'relative',
        margin: 'auto',
      }}
      {...rest}
    />
  ))

  return (
    <div className="h-screen">
      <div
        className=" bg-gray-50 text-xl flex items-center"
        style={{ height: 70 }}
      >
        斗鱼
      </div>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={totalCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <Grid
                className="bg-gray-200"
                columnCount={NUM_COLUMNS}
                columnWidth={width / NUM_COLUMNS - 10}
                height={height - 70}
                rowCount={rowCount}
                rowHeight={200}
                innerElementType={innerElementType}
                onItemsRendered={(gridProps) => {
                  onItemsRendered({
                    overscanStartIndex:
                      gridProps.overscanRowStartIndex * NUM_COLUMNS,
                    overscanStopIndex:
                      gridProps.overscanRowStopIndex * NUM_COLUMNS,
                    visibleStartIndex:
                      gridProps.visibleRowStartIndex * NUM_COLUMNS,
                    visibleStopIndex:
                      gridProps.visibleRowStopIndex * NUM_COLUMNS,
                  })
                }}
                ref={ref}
                width={width}
              >
                {Cell}
              </Grid>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  )
}

export default huya
