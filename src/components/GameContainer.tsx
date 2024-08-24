import React, { ComponentProps } from "react";
import GameMenu from "./GameMenu";
import MainGameWindow from "./MainGameWindow";

const GameContainer: React.FC<ComponentProps<"div">> = ({ ...props }) => {
  return (
    <div {...props}>
      <MainGameWindow columnSize={4} rowSize={4} />
      <GameMenu />
    </div>
  )
}

export default GameContainer
