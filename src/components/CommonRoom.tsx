import ReactPlayer from 'react-player'
import React from 'react'

interface Props {
  url: string
  isError: boolean
}

export const CommonRoom = ({ url, isError }: Props) => {
  return (
    <div className="w-screen md:w-2/3  mx-auto h-screen">
      <div className="bg-gray-100 py-3 text-xl pl-3"> 斗鱼</div>

      {isError ? (
        <div>房间未开播</div>
      ) : (
        <ReactPlayer
          className=" relative max-h-screen mx-auto"
          url={url}
          playing={true}
          controls={true}
          width={'100'}
          height={'100'}
          onError={(error) => {
            console.log('react player error:' + error)
          }}
        />
      )}
    </div>
  )
}
