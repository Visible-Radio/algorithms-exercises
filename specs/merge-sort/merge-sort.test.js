/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const merge = (a, b) => {
  let result = [];
  let cursor1 = 0;
  let cursor2 = 0;

  // when a number is added to result, increment the cursor for the source array it came from
  while (cursor1 < a.length && cursor2 < b.length) {
    const elementA = a[cursor1];
    const elementB = b[cursor2];

    if (elementA < elementB || elementA === elementB) {
      result.push(elementA);
      cursor1++;
    } else if (elementB < elementA) {
      result.push(elementB);
      cursor2++;
    }
  }

  // finish up
  // if one of the arrays had 'left overs', append those to the end of result
  const leftOversA = a.slice(cursor1);
  const leftOversB = b.slice(cursor2);

  return [...result, ...leftOversA, ...leftOversB];
};

const mergeSort = nums => {
  if (nums.length === 1) return nums;

  const middle = Math.ceil(nums.length / 2);
  const a = nums.slice(0, middle);
  const b = nums.slice(middle);

  return merge(mergeSort(a), mergeSort(b));
};

describe("merge function", () => {
  const mergeCases = [
    [[38], [27], [27, 38]],
    [
      [27, 38],
      [3, 43],
      [3, 27, 38, 43],
    ],
    [[9, 82], [10], [9, 10, 82]],
    [
      [3, 27, 38, 43],
      [9, 10, 82],
      [3, 9, 10, 27, 38, 43, 82],
    ],
  ];

  mergeCases.forEach(([a, b, expectedResult]) => {
    test(`merge([${a.join(", ")}], [${b.join(
      ", "
    )}]) yields [${expectedResult.join(", ")}]`, () => {
      expect(merge(a, b)).toEqual(expectedResult);
    });
  });
});

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
