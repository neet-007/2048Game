import React, { ComponentProps, useRef, useState } from "react";

type MultiableOfTwo = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | undefined

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
  const [rectangles, setRectangles] = useState<MultiableOfTwo[]>([undefined, 2, 2, undefined, undefined, 2, undefined, 2, 2, undefined, 2, undefined, 2, undefined, 2, undefined])
  const rectContainerRef = useRef<HTMLDivElement>(null);

  function moveUp() {
    if (rectContainerRef.current === null) {
      return
    }
    const rectContainerChildren = rectContainerRef.current.children

    setRectangles(prev => {
      const newRect = [...prev];

      for (let i = 0; i < columnSize; i++) {
        let start = i + columnSize;

        while (start <= ((rowSize - 1) * columnSize) + i) {
          let curr = start;

          while (curr > i) {
            if (curr != start) {
              rectContainerChildren[curr + columnSize].classList.remove("rect-down-transform");
            }
            rectContainerChildren[curr].classList.remove("rect-up-transform");

            if (newRect[curr - columnSize] != undefined) {
              curr = curr - columnSize
              continue;
            }
            const temp = newRect[curr];
            newRect[curr] = newRect[curr - columnSize];
            newRect[curr - columnSize] = temp;
            const c = curr
            setTimeout(() => {
              rectContainerChildren[c].classList.add("rect-down-transform");
              rectContainerChildren[c - columnSize].classList.add("rect-up-transform");
            }, 500)

            curr = curr - columnSize
          }
          start = start + columnSize;
        }
      }

      return newRect
    })
  }

  return (
    <div style={{ width: `${rowSize * 70}px`, height: `${columnSize * 70}px` }}
      className="main-game-window" ref={rectContainerRef} {...props}>
      {rectangles.map((val, index) => (
        <Rectangle key={`${index}-rect`}
          rectGap={`translate(${(((index) % columnSize) * 70)}px, 
          ${(Math.floor(index / rowSize)) * 70}px)`}
          rectColor={`${val ? "blue" : "white"}`} rectValue={val} />
      ))}
      <button style={{ position: "absolute", zIndex: "100" }} onClick={moveUp}>dsad</button>
    </div>
  )
}

export default MainGameWindow


