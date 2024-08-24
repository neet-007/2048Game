import React, { ComponentProps } from "react";

const GameMenu: React.FC<ComponentProps<"div">> = ({ ...props }) => {
  return (
    <div {...props}>
      game menu
    </div>
  )
}

export default GameMenu
