# Understanding runtime complexity

When looking at ways to solve problems in programming, there is one simple metric that we can use as a proxy to estimate efficiency. It’s the **number of operations** relative to **the size of the input**, i.e., **runtime complexity**. 

Let’s say that...
- You're given an array of numbers
- And a target value which is a number
- I want you to find out which 2 numbers in the array equal to the target.
  - Specifically, I’d like for you to return the indices of those 2 numbers in the array. 

This problem is known as a variation of `targetSum`

```tsx
/**
 * Finds indices of two numbers from the given array that sum up 
 * to the target value `k`.
 * 
 * @param {number[]} nums - An array of unique positive integers.
 * @param {number} target - The target sum that combinations should add up to.
 *
 * @returns {[number, number]} - An array of the two matching indices where 
 * the numbers add up to the target. If no two integers meet the criteria, 
 * return [-1, -1].
 */

function targetSum(nums: number[], target: number): [number, number] {
  // Function implementation goes here
}
```

Here is an step-by-step walkthrough of a correct answer. Let’s say that our function is given following arguments, `target` and `nums`, listed below. I’ve also added corresponding indices to the array as a comment for illustrative purposes. Lastly, I’ve provided the correct solution as `result`.

```tsx
const target = 100;
const nums = [61, 33, 45, 12, 89, 42, 78, 98, 25, 75];
// indices = [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9];

/**
 * Solution:
 *   target values:  25 + 75 = 100
 *   target indices: nums[8] = 25, nums[9] = 75
 */
const result = [8, 9]; // or [9, 8] since order doesn't matter
```

## How do we arrive at this solution programmatically? 
Let’s start by solving this the naive way where we just use two nested loops:

```tsx
function targetSum(nums: number[], target: number): [number, number] {
  for (let i = 0; i < nums.length; i++) {
    const firstNum = nums[i];
    
    for (let j = 0; j < nums.length; j++) {
      // this if statement ensures that we don't use the same index twice
      if (i !== j) { 
        const secondNum = nums[j];
        if (firstNum + secondNum === target) {
          return [i, j];
        }
      }
    }
  }
  
  return [-1, -1];
}
```

### How efficient is this solution?

Let’s break this down. We’ll always look the worst case.

- We have an array with 10 items, so `n = 10`
- First, we loop through the array once meaning 10 iterations, so `n * 1` or just `n`
    - Within each loop, we iterate through the same array again meaning 10 iterations per loop (100 iterations total), so `n * n` or `n^2`.

This runtime complexity would be classified as `Quadratic Time` and is considered pretty inefficient. The runtime complexity increases **exponentially** with the size of the input. Bad bad bad. This is the case that we want to avoid. But before we dive into that, let’s pause and talk about what **runtime complexity** actually is in practice.

## Runtime Complexity

At a high-level, the number of operations it takes for an algorithm to solve a problem is inversely related to its efficiency. That is to say, the **fewer operations** it takes to solve a problem, the **more efficient** that solution is. As the number of operations goes up, the efficiency goes down.

And this makes intuitive sense, right? If you can accomplish something with **less work**, you are being **more efficient**. 

This is precisely what runtime complexity evaluates.

One thing to keep in mind is that, in this context, we’re almost always talking about loops. This is an oversimplification, but you can *almost* *always* think of these evaluations from the lens of these questions: 

1. "How many iterations is my algorithm going to perform?" *and* 
1. "What is the worst case scenario?"

### Different types of runtime complexities

Let’s see if we can solve `targetSum` more efficiently. One approach is that we could: 

- Iterate through the array once and store all the numbers and their corresponding indices in something like a hash map.
    - A hash map, or a similar data structure such as an object, dictionary, record, etc. has fast lookups because you can do so instantly without iteration.
- Once we have all the values stored, we iterate through the array again. In each iteration, look for the difference between the target and current values. If that difference exists in the hash map, we can return its index as well as the index of our current value.

```tsx
function targetSum(nums: number[], target: number): [number, number] {
  // create hash map
  let valueToIndexMap: Record<number, number> = {};
  
  // store every value with its corresponding
  // index in the hash map
  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];
    valueToIndexMap[curr] = i;
  }

  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];
    const diff = target - num;
    const foundIndex = valueToIndexMap[difference];
    if (typeof foundIndex === 'number' && foundIndex !== i) {
      return [foundIndex, i];
    }
  }
  
  return [-1, -1];
}
```

Now let’s evaluate the runtime complexity of this solution. 

- We have an array with 10 items, so `n = 10`
- First, we loop through the array once meaning 10 iterations and store some value, so `n * 1` or just `n`
- Second, we loop through the array again meaning another 10 iterations and look for a match, so `n * 2` or just `2n`. For runtime complexity, we can drop the constant, so this can be expressed simply as `n`.

This is called `Linear time` because we can get the value of the difference in linear time compared to the size of the input.

So far, we know that…

- The first solution had 2 nested loops (100 iterations)
    - `n^2` → Quadratic Time
- The second solution had 2 loops but they weren’t nested (20 iterations)
    - `2n` or `n` → Linear Time

That is actually quite a BIG difference! Imagine these arrays were much larger and we were shrinking something from 1 million iterations to 200,000 iterations. Pretty significant, right?

You could solve this even more efficiently (just one loop)...

```typescript
function targetSum(nums: number[], target: number): [number, number] {
  let valueToIndexMap: Record<number, number> = {};

  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];
    const complement = target - curr;

    // Check if the complement is already in the map
    if (complement in valueToIndexMap) {
      return [valueToIndexMap[complement], i];
    }

    // Store the current number with its index
    valueToIndexMap[curr] = i;
  }

  return [-1, -1];
}
```

### Big O Notation

Big-O notation describes how the time or space needed for an algorithm grows as the input size increases. It can be used to runtime OR space complexity but we’re only focused on the former here. The reason to bring it up is because we use Big O notation and terminology to explain these concepts. For instance…

- Instead of `n`, we would actually write this in Big O notation as `O(n)`
- Instead of `n^2`, we would write `O(n^2)`

With `O` representing the upper bound on the worst-case performance.

## Different Types

There are many types of potential runtime complexities but I want you to be able to memorize the important ones. For that, I have a mnemonic, albeit a terrible one. 

### `Judge OLIt[]`

<img width="566" alt="OLIT" src="https://github.com/user-attachments/assets/052f3618-9a7d-4953-b29b-ece115ed17fe" />



Yeah, sorry, but you’ll probably remember it. Maybe. 

Okay, it’s really more like this…
<img width="732" alt="olito-visual" src="https://github.com/user-attachments/assets/f89fa5ac-66e1-444c-8ece-ef7b3145f9f2" />

I know, it's still terrible :) 

`O` `L` `I` `t` `[]`

| **Letter** | **Meaning** | **Metric** |  |
| --- | --- | --- | --- |
| `O` | 🎯 **Bullseye** | `ConstantTime` `O(n)` | The shape of `*O*` represents a target or a single, fixed point. It means the time taken is the same no matter how big the input is (e.g., looking up an array element by index). |
| `L` | 📐 **The Fold (in halves)** | `LogarithmicTime` `O(log n)` | The shape of `L` suggests “folding” something in half repeatedly, just like how binary search cuts the problem size in half at each step. |
| `I` | 📈 **The Slant (45°)** | `LinearTime` `O(n)` | The slanted `I` resembles a straight diagonal line, just like an algorithm that scales proportionally with input size (e.g., looping through an array). |
| `t` | 📊 **The Fold + The Slant** | `LinearithmicTime` `O(n log n)` | `t` combines `L` (logarithmic) and `I` (linear), representing algorithms that involve both—like efficient sorting algorithms (Merge Sort, QuickSort). |
| `[]`  | 🔲 **The Squared** | `QuadraticTime` `O(n^2)` | The square brackets `[]` look like a box or a grid, representing quadratic growth, often caused by nested loops (e.g., checking all pairs in a list). |
