import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FixedSizeGrid as Grid } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import AutoSizer from 'react-virtualized-auto-sizer'
import axios from '../../api/ajax'
import { useDispatch } from 'react-redux'
import { addRooms, setTotal } from './slice'

const douyu = () => {
  let douyuData = useSelector((state) => state.douyu.liveRooms)
  const dispatch = useDispatch()

  useEffect(() => {
    if (douyuData?.length === 0) onPullingUp()
  }, [douyuData])

  const NUM_COLUMNS = 2
  // const [totalCount, setTotalCount] = useState(douyuData.length)
  let totalCount = useSelector((state) => state.douyu.total)
  const [rowCount, setRowCount] = useState(totalCount / NUM_COLUMNS)

  const isItemLoaded = (index) => !!douyuData[index]

  const loadMoreItems = (startIndex, stopIndex) => {
    console.log('startIndex:', startIndex)
    console.log('stopIndex:', stopIndex)
    return new Promise(async (resolve) => {
      await onPullingUp()
      resolve()
    })
  }

  useEffect(() => {
    // console.log('douyuData----')
    setRowCount(totalCount / NUM_COLUMNS)
  }, [totalCount])

  const onPullingUp = useCallback(() => {
    let count = douyuData.length
    let SIZE = 20 //每页默认20个
    let page = count / SIZE
    axios
      .get('douyu', {
        params: {
          page: page + 1,
          size: SIZE,
        },
      })
      .then((data) => {
        console.log(data)
        data = data.data
        // setTotalCount(data.total)
        dispatch(setTotal(data.total))
        dispatch(addRooms(data.list))
      })
      .catch((e) => {
        console.log(e)
        alert('未开播')
      })
  }, [douyuData])

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

  return (
    <div className="h-screen">
      <div className="bg-yellow-100 text-xl" style={{ height: 70 }}>
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
                className="bg-blue-200  "
                columnCount={NUM_COLUMNS}
                columnWidth={width / 2}
                height={height - 70}
                rowCount={rowCount}
                rowHeight={200}
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
