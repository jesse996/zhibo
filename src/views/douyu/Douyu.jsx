import { useCallback, useEffect, useState, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FixedSizeGrid as Grid } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import AutoSizer from 'react-virtualized-auto-sizer'
import axios from '../../api/ajax'
import { useDispatch } from 'react-redux'
import { addRooms, setTotal } from './slice'

const douyu = () => {
  let width = document.querySelector('body').offsetWidth
  let NUM_COLUMNS = 2
  if (width > 500) NUM_COLUMNS = 3

  let douyuData = useSelector((state) => state.douyu.liveRooms)
  const dispatch = useDispatch()

  let totalCount = useSelector((state) => state.douyu.total)
  const [rowCount, setRowCount] = useState(totalCount / NUM_COLUMNS)

  //初始化
  useEffect(() => {
    if (douyuData?.length === 0) loadMoreItems(0, 30)
  }, [douyuData])

  const isItemLoaded = (index) => {
    return !!douyuData[index]
  }

  const loadMoreItems = (startIndex, stopIndex) => {
    let SIZE = stopIndex - startIndex
    let page = parseInt(startIndex / SIZE) + 1
    new Promise((resolve) => {
      axios
        .get('douyu', {
          params: {
            page: page,
            size: SIZE,
          },
        })
        .then((data) => {
          data = data.data
          // setTotalCount(data.total)
          dispatch(setTotal(data.total))
          dispatch(addRooms({ start: startIndex, list: data.list }))
        })
        .catch((e) => {
          console.log(e)
        })
      resolve()
    })
  }

  useEffect(() => {
    setRowCount(totalCount / NUM_COLUMNS)
  }, [totalCount])

  const Cell = (props) => {
    const { columnIndex, rowIndex, style } = props
    const itemIndex = rowIndex * NUM_COLUMNS + columnIndex

    const i = douyuData[itemIndex] || {}

    return (
      <div
        className="flex flex-col  items-center"
        key={itemIndex}
        style={style}
      >
        <Link
          to={`/douyu/${i.rid}`}
          className="flex flex-col justify-center  items-start w-44 "
        >
          <img src={i.coverImg} className="h-32 w-44"></img>
          <div className="flex flex-col">
            <div className="text-sm">{i.name}</div>
            <div className="text-sm">{i.title}</div>
          </div>
        </Link>
      </div>
    )
  }

  const innerElementType = forwardRef(({ style, ...rest }, ref) => (
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

export default douyu
