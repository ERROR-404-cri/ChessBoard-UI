const boardContainer = document.querySelector(".boardContainer");
let allHighlightedElementIdsOld = [];
let allHighlightedElementIdsNew = [];

const createBoxElem = (className, id) => {
  const divElem = document.createElement("div");
  divElem.classList.add(className);
  divElem.id = id;
  return divElem;
};

const getOneRowOfBoard = (isEvenRow, rowNumber) => {
  const fragment = document.createDocumentFragment();
  const rowDivElem = document.createElement("div");

  let count = 1;
  for (let i = 0; i < 4; i++) {
    if (!isEvenRow) {
      const blackBox = createBoxElem("blackBox", `${rowNumber}${count + 1}`);
      const whiteBox = createBoxElem("whiteBox", `${rowNumber}${count}`);
      fragment.appendChild(whiteBox);
      fragment.appendChild(blackBox);
    } else {
      const blackBox = createBoxElem("blackBox", `${rowNumber}${count}`);
      const whiteBox = createBoxElem("whiteBox", `${rowNumber}${count + 1}`);
      fragment.appendChild(blackBox);
      fragment.appendChild(whiteBox);
    }
    count += 2;
  }

  rowDivElem.appendChild(fragment);
  rowDivElem.classList.add("flex");
  return rowDivElem;
};

const createRows = (noOfRows) => {
  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= noOfRows; i++) {
    const isEven = i % 2 === 0;
    const row = getOneRowOfBoard(isEven, i);
    fragment.appendChild(row);
  }
  boardContainer.appendChild(fragment);
};

const getAllHighlightedElementIds = (row, column) => {
  let rowtoGetUpperIds = row;
  let rowtoGetLowerIds = row;
  let columntoGetUpperIds = column;
  let columntoGetLowerIds = column;

  const idsNeedsToBeHighlighted = [];
  while (--rowtoGetUpperIds > 0) {
    const distance = row - rowtoGetUpperIds;
    if (columntoGetUpperIds - distance > 0) {
      idsNeedsToBeHighlighted.push(
        `${rowtoGetUpperIds}${columntoGetUpperIds - distance}`
      );
    }
    if (columntoGetUpperIds + distance <= 8) {
      idsNeedsToBeHighlighted.push(
        `${rowtoGetUpperIds}${columntoGetUpperIds + distance}`
      );
    }
  }

  while (++rowtoGetLowerIds <= 8) {
    const distance = rowtoGetLowerIds - row;
    if (columntoGetLowerIds - distance > 0) {
      idsNeedsToBeHighlighted.push(
        `${rowtoGetLowerIds}${columntoGetLowerIds - distance}`
      );
    }

    if (columntoGetLowerIds + distance <= 8) {
      idsNeedsToBeHighlighted.push(
        `${rowtoGetLowerIds}${columntoGetLowerIds + distance}`
      );
    }
  }
  allHighlightedElementIdsOld = [...allHighlightedElementIdsNew];
  return (allHighlightedElementIdsNew = idsNeedsToBeHighlighted);
};

createRows(8);

boardContainer.addEventListener("mouseover", (ev) => {
  const targetId = ev.target.id;
  const [row, column] = targetId?.split("") || [];
  allHighlightedElementIdsNew = getAllHighlightedElementIds(
    Number(row),
    Number(column)
  );
  colorDiagonalBox(allHighlightedElementIdsOld, allHighlightedElementIdsNew);
});

const colorDiagonalBox = (
  allHighlightedElementIdsOld,
  allHighlightedElementIdsNew
) => {
  allHighlightedElementIdsOld.forEach((id) => {
    const element = document.getElementById(`${id}`);
    element.classList.remove("colorBackground");
  });

  allHighlightedElementIdsNew.forEach((id) => {
    const element = document.getElementById(`${id}`);
    element.classList.add("colorBackground");
  });
};
