// Sequential numeric ID generator
export const createSequentialIdGenerator = (start = 1) => {
  let currentId = start

  return function () {
    return currentId++
  }
}

export const generateId = createSequentialIdGenerator(8)
