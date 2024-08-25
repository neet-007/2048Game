
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
            rectContainerChildren[curr].classList.add("rect-down-transform");
            rectContainerChildren[curr - columnSize].classList.add("rect-up-transform");

            curr = curr - columnSize
          }
          start = start + columnSize;
        }
      }

      return newRect
    })
  }
