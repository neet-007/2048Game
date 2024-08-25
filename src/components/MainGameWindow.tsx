import React, { ComponentProps, useEffect, useRef, useState } from "react";

type MultiableOfTwo = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | undefined

type ReactangleProps = {
  rectColor: string
  rectValue: MultiableOfTwo
  rectGapX: number
  rectGapY: number
}

const Rectangle: React.FC<ComponentProps<"div"> & ReactangleProps> = ({ rectColor, rectValue,
  rectGapX, rectGapY, ...props }) => {

  return (
    <div
      {...props}
      style={{
        backgroundColor: rectColor,
        color: "white",
        top: rectGapY,
        left: rectGapX,
        zIndex: rectValue ? 100 : -100
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
  const [gameState, setGameState] = useState<"up" | "down" | "none">("none")
  const [i, setI] = useState(-1);
  const [start, setStart] = useState(-1);
  const [curr, setCurr] = useState(-1);
  const rectContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameState == "none") {
      setI(-1);
      return;
    }

    if (gameState == "up") {
      setI(0);
      return
    }

  }, [gameState])

  useEffect(() => {
    if (i === -1) {
      setStart(-1);
      return
    }
    if (i >= columnSize) {
      setGameState("none");
      return
    }

    setStart(i + columnSize);

  }, [i])

  useEffect(() => {
    if (start === -1) {
      setCurr(-1);
      return
    }
    if (start > ((rowSize - 1) * columnSize) + i) {
      setI(prev => prev + 1);
      return
    }

    if (rectContainerRef.current === null) {
      return
    }

    const rectContainerChildren = rectContainerRef.current.children
    if (start + columnSize <= ((rowSize - 1) * columnSize) + i) {
      rectContainerChildren[start + columnSize].classList.remove("rect-down-transform");
      rectContainerChildren[start + columnSize].classList.remove("rect-up-transform");
    }
    rectContainerChildren[start].classList.remove("rect-up-transform");
    rectContainerChildren[start].classList.remove("rect-down-transform");
    setCurr(start);
  }, [start])

  useEffect(() => {
    if (curr === -1) {
      return
    }
    if (curr <= i) {
      setStart(prev => prev + columnSize);
      return
    }

    if (rectContainerRef.current === null) {
      return
    }

    const rectContainerChildren = rectContainerRef.current.children
    const newRect = [...rectangles];
    let c = 0
    while (c < newRect.length) {
      rectContainerChildren[c].classList.remove("rect-down-transform");
      rectContainerChildren[c].classList.remove("rect-up-transform");
      c++;
    }

    if (newRect[curr - columnSize] != undefined) {
      setTimeout(() => {
        setCurr(prev => prev - columnSize)
      }, 500)
      return;
    }
    const temp = newRect[curr];
    newRect[curr] = newRect[curr - columnSize];
    newRect[curr - columnSize] = temp;
    rectContainerChildren[curr].classList.add("rect-down-transform");
    rectContainerChildren[curr - columnSize].classList.add("rect-up-transform");

    const timeOut = setTimeout(() => {
      setCurr(prev => prev - columnSize)
      setRectangles(newRect)
    }, 500)

    return () => clearTimeout(timeOut)

  }, [curr])

  return (
    <div style={{ width: `${rowSize * 70}px`, height: `${columnSize * 70}px` }}
      className="main-game-window" ref={rectContainerRef} {...props}>
      {rectangles.map((val, index) => (
        <Rectangle key={`${index}-rect`}
          rectGapX={(((index) % columnSize) * 70)}
          rectGapY={(Math.floor(index / rowSize)) * 70}
          rectColor={`${val ? "blue" : "white"}`} rectValue={val} />
      ))}
      <button style={{ position: "absolute", zIndex: "100" }} onClick={() => setGameState("up")}>dsad</button>
    </div>
  )
}

export default MainGameWindow


