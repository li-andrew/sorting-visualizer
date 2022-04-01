import React from "react";
import shortid from "shortid";
import isShortId from "shortid/lib/is-valid";
import Bar from "./Bar";

let count = 0;
let reset = false;

class Graph extends React.Component {
  state = {
    arr: [7, 4, 5, 3, 8, 3, 2, 1, 13, 11],
    compare: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    k: 0,
  };

  randomize = () => {
    const max = 12; //this is the max
    this.setState({
      arr: this.state.arr.map(() => Math.floor(Math.random() * max) + 1),
    });
  };

  //bubblesort from https://www.geeksforgeeks.org/bubble-sort-algorithms-by-using-javascript/
  bubbleSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      // Last i elements are already in place
      for (let j = 0; j < arr.length - i - 1; j++) {
        // Checking if the item at present iteration
        // is greater than the next iteration
        this.highlight(j, j + 1, count, arr); //*
        if (arr[j] > arr[j + 1]) {
          // If the condition is true then swap them
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }

        count += 1; //*
      }
    }
    reset = true;
    this.highlight(-1, -1, count, this.state.arr);
    // Print the sorted array
  };

  //https://sebhastian.com/insertion-sort-javascript/
  insertionSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      // First, choose the element at index 1
      let current = arr[i];
      let j;

      // Loop from right to left, starting from i-1 to index 0
      for (j = i - 1; j >= 0 && arr[j] > current; j--) {
        // as long as arr[j] is bigger than current
        // move arr[j] to the right at arr[j + 1]
        arr[j + 1] = arr[j];
        let temparr = arr.map((x) => x); //*
        temparr[j] = current; //*
        this.highlight(j, j + 1, count, temparr); //*

        count += 1; //*
      }
      // Place the current element at index 0
      // or next to the smaller element
      arr[j + 1] = current;
    }
    reset = true;
    this.highlight(-1, -1, count, this.state.arr);
    return arr;
  };

  swap = (items, leftIndex, rightIndex) => {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  };

  partition = (items, left, right) => {
    var pivot = items[Math.floor((right + left) / 2)], //middle element
      i = left, //left pointer
      j = right; //right pointer
    while (i <= j) {
      while (items[i] < pivot) {
        this.highlight(i, j, count, this.state.arr); //*
        count += 1;
        i++;
      }
      while (items[j] > pivot) {
        this.highlight(i, j, count, this.state.arr); //*
        count += 1;
        j--;
      }
      this.highlight(i, j, count, this.state.arr); //*
      count += 1;
      if (i <= j) {
        this.swap(items, i, j); //sawpping two elements
        i++;
        j--;
        this.highlight(i, j, count, this.state.arr); //*
        count += 1;
      }
    }
    return i;
  };
  //https://www.guru99.com/quicksort-in-javascript.html
  quickSort = (items, left, right) => {
    var index;
    if (items.length > 1) {
      index = this.partition(items, left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        this.quickSort(items, left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        this.quickSort(items, index, right);
      }
    }
    if (left == 0 && right == this.state.arr.length - 1) {
      reset = true;

      this.highlight(-1, -1, count, this.state.arr); //*
    }
    return items;
  };

  updatemap = (visual, j, arr, k) => {
    j = j - 1;
    k = k - 1;
    visual[j] = arr[k];

    return visual;
  };

  //https://stackoverflow.com/questions/32041092/implementing-merge-sort-iteratively
  mergeSort = (arr) => {
    let visual = arr.map((x) => x);

    var sorted = arr.slice(),
      n = sorted.length,
      buffer = new Array(n);

    for (var size = 1; size < n; size *= 2) {
      for (var leftStart = 0; leftStart < n; leftStart += 2 * size) {
        var left = leftStart,
          right = Math.min(left + size, n),
          leftLimit = right,
          rightLimit = Math.min(right + size, n),
          i = left;
        while (left < leftLimit && right < rightLimit) {
          if (sorted[left] <= sorted[right]) {
            buffer[i++] = sorted[left++];
            visual = this.updatemap(visual, i, sorted, left);
            this.highlight(left, right, count, visual);
            console.log(visual);
            count += 1;
          } else {
            buffer[i++] = sorted[right++];
            visual = this.updatemap(visual, i, sorted, right);
            this.highlight(left, right, count, visual);
            console.log(visual);
            count += 1;
          }
        }
        while (left < leftLimit) {
          buffer[i++] = sorted[left++];

          visual = this.updatemap(visual, i, sorted, right);
          this.highlight(i, left, count, visual);
          console.log(visual);
          count += 1;
        }
        while (right < rightLimit) {
          buffer[i++] = sorted[right++];

          visual = this.updatemap(visual, i, sorted, right);
          this.highlight(i, right, count, visual);
          console.log(visual);
          count += 1;
        }
      }
      var temp = sorted,
        sorted = buffer,
        buffer = temp;

      count += 1;
    }
    reset = true;

    this.highlight(-1, -1, count, visual); //*
    console.log(visual);

    return sorted;
  };

  highlight = (comp1, comp2, k, arr) => {
    let temparr = arr.map((x) => x);
    let comptemp = this.state.compare.map((x) => x);
    let resetcomp = this.state.compare.map(() => false);

    if (comp1 != -1 && comp2 != -1) {
      comptemp[comp1] = true;
      comptemp[comp2] = true;
    }

    let interval = 100;

    let time = k * interval;

    setTimeout(() => {
      console.log(k);
      this.setState({
        arr: temparr,
        compare: comptemp,
      });
    }, time);

    if (reset) {
      setTimeout(() => {
        console.log("hi");
        this.setState({
          compare: resetcomp,
        });
      }, time + interval);
    }
  };

  render() {
    return (
      <div className="body">
        <div className="graph">
          <div className="position">
            {this.state.arr.map((len, index) => (
              <div
                style={{
                  display: "inline-block",
                }}
                key={shortid.generate()}
              >
                <Bar
                  len={len}
                  id={shortid.generate()}
                  comp={this.state.compare[index]}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="navbar">
          <div className="randomizer">
            <button onClick={this.randomize}>Randomize</button>
          </div>

          <div className="algos">
            <span className="algo">
              <button
                className="butt"
                onClick={() => {
                  count = 0;
                  reset = false;
                  this.bubbleSort(this.state.arr);

                  console.log("output = " + this.state.arr);
                }}
              >
                Bubble Sort
              </button>
            </span>
            <span className="algo">
              <button
                className="butt"
                onClick={() => {
                  count = 0;
                  reset = false;
                  this.insertionSort(this.state.arr);

                  console.log("output = " + this.state.arr);
                }}
              >
                Insertion Sort
              </button>
            </span>
            <span className="algo">
              <button
                className="butt"
                onClick={() => {
                  count = 0;
                  reset = false;
                  this.quickSort(this.state.arr, 0, this.state.arr.length - 1);

                  console.log("output = " + this.state.arr);
                }}
              >
                Quick Sort
              </button>
            </span>
            <span className="algo">
              <button
                className="butt"
                onClick={() => {
                  count = 0;
                  reset = false;
                  this.mergeSort(this.state.arr);

                  console.log("output = " + this.state.arr);
                }}
              >
                Merge Sort
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Graph;
