import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { FixedSizeGrid as Grid } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import AutoSizer from 'react-virtualized-auto-sizer'

interface Props {
  isItemLoaded: any
  totalCount: number
  loadMoreItems: any
  NUM_COLUMNS: number
  rowCount: number
  data: any[]
  urlName: string
  title: string
  ridName: string
  coverImgName: string
  nickname: string
  titleName: string
}
export const CommonView: React.FC<Props> = ({
  isItemLoaded,
  totalCount,
  loadMoreItems,
  NUM_COLUMNS,
  rowCount,
  data,
  urlName,
  title,
  ridName,
  coverImgName,
  nickname,
  titleName,
}) => {
  const Cell = (props: any) => {
    const { columnIndex, rowIndex, style } = props
    const itemIndex = rowIndex * NUM_COLUMNS + columnIndex

    const i = data[itemIndex] || {}

    return (
      <div
        className="flex flex-col  items-center"
        key={itemIndex}
        style={style}
      >
        <Link
          to={`/${urlName}/${i[ridName]}`}
          className="flex flex-col justify-center  items-start w-44 "
        >
          <img src={i[coverImgName]} className="h-32 w-44"></img>
          <div className="flex flex-col">
            <div className="text-sm">{i[nickname]}</div>
            <div className="text-sm">{i[titleName]}</div>
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
        {title}
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
