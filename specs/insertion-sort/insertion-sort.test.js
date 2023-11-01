/*
  Insertion sort!

  Be sure to call your function insertionSort!

  The idea here is that the beginning of your list is sorted and the everything else is assumed to be an unsorted mess.
  The outer loop goes over the whole list, the index of which signifies where the "sorted" part of the list is. The inner
  loop goes over the sorted part of the list and inserts it into the correct position in the array.

  Like bubble sort, there's a visualization mechanism available to you. Just call snapshot(myArray) at the beginning of
  your inner loop and it should handle the rest for you!

  And you put xdescribe instead of describe if you want to suspend running the unit tests.
*/

function insertionSort1(nums) {
  for (let i = 0; i < nums.length; i++) {
    const insertThis = nums[i + 1];
    // walk backwards through nums starting at the last element of the sorted region
    for (let j = i; j > -1; j--) {
      if (insertThis < nums[j]) {
        // swap
        const temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
      }
    }
  }
}

// this is hard to think about due to it's imperative nature
// the inner loop does multiple things
// it "finds" the index at which the item should be inserted
// but it also "adjusts" the array to make room for the insertion.
// if these were separated into their own fucntions, it would be easier to think about
// 1 function that determines the index at which we should insert the element
// 1 function that adjusts the array accordingly and performs the insert
// the adjustment is this
// close the "hole" left by the element being moved by moving all elements to the left of it's index to the right

function insertionSort2(nums) {
  for (let i = 0; i < nums.length; i++) {
    const insertThis = nums[i];
    let j;

    // j loop needs to track the sorted region of the array
    // one index less than i, which points to the number we want to insert
    for (j = i - 1; j > -1; j--) {
      if (insertThis < nums[j]) {
        nums[j + 1] = nums[j];
      } else {
        break;
      }
    }
    nums[j + 1] = insertThis;
  }
}

function insertionSort3(nums) {
  const findInsertIndex = (cursor, arr) => {
    let j = cursor;
    while (j > 0) {
      if (arr[cursor] > arr[j - 1]) {
        break;
      }
      j--;
    }
    return j;
  };

  const moveRight = (leftIndex, rightIndex, arr) => {
    // move items to the left of hole index, but greater than the insert index to the right
    let k = rightIndex;
    while (k > leftIndex) {
      k--;
      arr[k + 1] = arr[k];
    }
  };

  for (let i = 0; i < nums.length; i++) {
    const insertThis = nums[i];
    const insertIndex = findInsertIndex(i, nums);
    moveRight(insertIndex, i, nums);
    nums[insertIndex] = insertThis;
  }
}

const funcs = [insertionSort1, insertionSort2, insertionSort3];

funcs.forEach(func => {
  test(`${func.name}`, () => {
    const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 100, 1];
    func(nums);
    expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100]);
  });
});
