import React, { ComponentProps, useState } from "react";

type MultiableOfTwo = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048

type ReactangleProps = {
  rectColor: string
  rectValue: MultiableOfTwo
  rectGap: string
}

const Rectangle: React.FC<ComponentProps<"div"> & ReactangleProps> = ({ rectColor, rectValue,
  rectGap, ...props }) => {

  return (
    <div
      {...props}
      style={{
        backgroundColor: rectColor, color: "white",
        transform: rectGap
      }}
      className="rect-class">
      {rectValue}
    </div>
  )
}

type MainGameWindowProps = {
  rowSize: number
  columnSize: number
}

const MainGameWindow: React.FC<ComponentProps<"div"> & MainGameWindowProps> = ({
  rowSize, columnSize, ...props }) => {
  const [rectangles, _] = useState<MultiableOfTwo[]>([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])

  return (
    <div style={{ width: `${rowSize * 70}px`, height: `${columnSize * 70}px` }}
      className="main-game-window" {...props}>
      {rectangles.map((val, index) => (
        <Rectangle key={`${index}-rect`}
          rectGap={`translate(${(((index + 1) % 4) * 70)}px, 
          ${(Math.floor(index / 4)) * 70}px)`}
          rectColor="blue" rectValue={val} />
      ))}
    </div>
  )
}

export default MainGameWindow


