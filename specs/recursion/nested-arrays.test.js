/*

  write a function that accepts an array that only contains
  two types of things: numbers and arrays. those nested arrays
  also only contain numbers and other, nested arrays.

  example: nestedAdd([1, 2, [3]]) = 6
           nestedAdd([[[2]], 1, [1, 3]]) = 7

 */

function nestedAdd(array, sum = 0) {
  return array.reduce((acc, itm) => {
    if (Array.isArray(itm)) {
      return acc + nestedAdd(itm);
    }
    return acc + itm;
  }, sum);
}

const funcs = [nestedAdd];

funcs.forEach(func => {
  test(`${func.name}`, () => {
    expect(func([1, 2, 3])).toEqual(6);
    expect(func([1, [2], 3])).toEqual(6);
    expect(func([[[[[[[[[5]]]]]]]]])).toEqual(5);
    expect(func([10, [12, 14, [1], [16, [20]]], 10, 11])).toEqual(94);
  });
});
