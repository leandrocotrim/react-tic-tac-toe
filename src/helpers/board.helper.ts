const rails = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

export const getBasePositions = (): any[] => [...Array(9)].map((_, index) => (index))

export const getWinner =
  (positions: any[]) => rails.find(rail => positions[rail[0]] === positions[rail[1]] && positions[rail[1]] === positions[rail[2]])


