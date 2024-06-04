
import React from 'react';
import { mergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 250;
const PRIMARY_COLOR = 'grey';
const SECONDARY_COLOR = 'blue';

class SortingVisualizer extends React.Component {
  state = {
    array: [],
  };

  componentDidMount() {
    this.resetArray();
  }

  resetArray = () => {
    const array = Array.from({ length: NUMBER_OF_ARRAY_BARS }, () =>
      randomIntFromInterval(5, 600)
    );
    this.setState({ array });
  };

  mergeSort = () => {
    const animations = mergeSortAnimations(this.state.array);
    animations.forEach((animation, i) => {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animation;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animation;
          arrayBars[barOneIdx].style.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    });
  };

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ backgroundColor: PRIMARY_COLOR, height: `${value}px` }}
          ></div>
        ))}
        <button onClick={this.resetArray}>Generate New Array</button>
        <button onClick={this.mergeSort}>Merge Sort</button>
      </div>
    );
  }
}

export default SortingVisualizer;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
