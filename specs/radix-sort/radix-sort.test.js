/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions

  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

/*

[20, 51, 3, 801, 415, 62]

POSITION 1
[
  0: 20,
  1: 51, 801
  2: 62,
  3: 3,
  4:
  5: 415,
  6:
  7:
  8:
  9:
]

[20,51,801,62,3,415]

POSITION 2
[
  0: 801, 3
  1: 415
  2: 20
  3:
  4:
  5: 51
  6: 62
  7:
  8:
  9:
]

[801,3,415,20,51,62]

POSITION 3
[
  0: 3, 20, 51, 62
  1:
  2:
  3:
  4: 415
  5:
  6:
  7:
  8: 801
  9:
]
[3,20,51,62,415, 801] 🤯

*/

/*
we need to do the bucketing process n times, where n is the number of digits in the largers number
look at the numbers in the input array
look at the first digit
append the number to the correct bucket for this digit (ie, the digit is the array index for the bucket)
when every number in the input array has been looked at, concat the buckets together in order

*/

function getDigitAtPosition(number, position, depth = 0) {
  if (depth > position) {
    return 0;
  }

  const remainder = number % 10;

  if (position === depth) {
    return remainder;
  }

  return getDigitAtPosition((number - remainder) / 10, position, depth + 1);
}

function getMaxDigits(numberArray) {}

test.only("getDigitAtPosition", () => {
  expect(getDigitAtPosition(15913, 0)).toBe(3);
  expect(getDigitAtPosition(15913, 1)).toBe(1);
  expect(getDigitAtPosition(15913, 2)).toBe(9);
  expect(getDigitAtPosition(15913, 3)).toBe(5);
  expect(getDigitAtPosition(15913, 4)).toBe(1);
  expect(getDigitAtPosition(15913, 5)).toBe(0);
});

function radixSort2(array) {
  const maxDigits = getMaxDigits();

  let out = numbers;
  for (let position = 0; position < maxDigits; position++) {
    let buckets = createBuckets();

    for (let j = 0; j < numbers.length; j++) {
      const number = out[j];
      const bucketIndex = getDigitAtPosition(number, position);
      buckets[bucketIndex].push(number);
    }
    out = buckets.flat();
  }
  return out.map(({ number }) => number);
}

function numbersWithMeta(nums) {
  return nums.reduce(
    (acc, number) => {
      const digits = String(number)
        .split("")
        .reverse()
        .map(string => Number(string));

      const digitCount = digits.length;
      acc.numbers.push({ number, digitCount, digits });

      if (digitCount > acc.maxDigits) {
        acc.maxDigits = digitCount;
      }

      return acc;
    },
    { maxDigits: 1, numbers: [] }
  );
}

function createBuckets() {
  return [[], [], [], [], [], [], [], [], [], []];
}

function radixSort1(array) {
  const { numbers, maxDigits } = numbersWithMeta(array);

  let out = numbers;
  for (let position = 0; position < maxDigits; position++) {
    let buckets = createBuckets();

    for (let j = 0; j < numbers.length; j++) {
      const richNumber = out[j];
      const bucketIndex = richNumber.digits[position] ?? 0;
      buckets[bucketIndex].push(richNumber);
    }
    out = buckets.flat();
  }
  return out.map(({ number }) => number);
}

const createTest = funcToTest => () => {
  describe(`${funcToTest.name}`, function () {
    it("should sort correctly", () => {
      const nums = [
        20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
        3000, 3001, 1200, 633,
      ];
      const ans = funcToTest(nums);
      expect(ans).toEqual([
        1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
        1200, 1244, 3000, 3001,
      ]);
    });
    it("should sort 99 random numbers correctly", () => {
      const fill = 99;
      const nums = new Array(fill)
        .fill()
        .map(() => Math.floor(Math.random() * 500000));
      const ans = funcToTest(nums);
      const sanity = ans.every((num, i, arr) => num > (arr[i - 1] ?? 0));
      expect(sanity).toBe(true);
      expect(ans).toEqual(nums.sort((a, b) => a - b));
    });
  });
};

[radixSort1].forEach(func => createTest(func)());
