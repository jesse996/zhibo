import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FixedSizeGrid as Grid } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import AutoSizer from 'react-virtualized-auto-sizer'
import axios from '../../api/ajax'
import { useDispatch } from 'react-redux'
import { addRooms } from './slice'

const douyu = () => {
  let douyuData = useSelector((state) => state.douyu.liveRooms)
  const dispatch = useDispatch()

  const NUM_COLUMNS = 2
  const [totalCount, setTotalCount] = useState(douyuData.length)
  const [rowCount, setRowCount] = useState(totalCount / NUM_COLUMNS)

  const isItemLoaded = (index) => !!douyuData[index]

  const loadMoreItems = (startIndex, stopIndex) => {
    // console.log('startIndex:', startIndex)
    // console.log('stopIndex:', stopIndex)
    return new Promise((resolve) => resolve())
  }

  useEffect(() => {
    // console.log('douyuData----')
    console.log(douyuData)
    setRowCount(douyuData.length / NUM_COLUMNS)
  }, [douyuData])

  useEffect(() => {
    if (douyuData?.length === 0) onPullingUp()
  }, [])

  const onPullingUp = () => {
    let count = douyuData.length
    let SIZE = 20 //每页默认20个
    let page = count / SIZE
    axios
      .get('douyu', {
        // params: {
        //   page: page + 1,
        //   size: SIZE,
        // },
      })
      .then((data) => {
        console.log(data)
        data = data.data
        setTotalCount(data.total)
        // data.list = data.list.map((i) => ({ ...i, href: i.href.substring(21) }))
        dispatch(addRooms(data.list))
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const Cell = (props) => {
    const { columnIndex, rowIndex, style } = props
    const itemIndex = rowIndex * NUM_COLUMNS + columnIndex

    const i = douyuData[itemIndex] || {}

    return (
      <div className="flex flex-col" key={itemIndex} style={style}>
        <Link to={`/douyu/${i.rid}`}>
          <img src={i.coverImg} className="h-24 w-48"></img>
          <div className="flex-grow ">
            <div className="text-sm">{i.name}</div>
            <div className="text-sm">{i.title}</div>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen bg-blue-200">
      <div>douyu</div>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={douyuData.length}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <Grid
                className="List"
                columnCount={NUM_COLUMNS}
                columnWidth={200}
                height={height}
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
