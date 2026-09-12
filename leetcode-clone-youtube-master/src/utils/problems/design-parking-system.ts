import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: three simple counters, one per parking spot size.
class ReferenceParkingSystem {
	private slots: [number, number, number];

	constructor(big: number, medium: number, small: number) {
		this.slots = [big, medium, small];
	}

	addCar(carType: number): boolean {
		const idx = carType - 1;
		if (this.slots[idx] > 0) {
			this.slots[idx]--;
			return true;
		}
		return false;
	}
}

export const designParkingSystemHandler = (fn: any) => {
	try {
		const runTest = (ctorArgs: [number, number, number], carTypes: number[]) => {
			const obj = fn(...ctorArgs);
			const ref = new ReferenceParkingSystem(...ctorArgs);
			for (const carType of carTypes) {
				const result = obj.addCar(carType);
				const expected = ref.addCar(carType);
				assert.equal(result, expected);
			}
		};

		runTest([1, 1, 0], [1, 2, 3, 1]);
		runTest([0, 0, 1], [3, 3, 3, 1]);
		runTest([2, 0, 0], [1, 1, 1, 2]);

		return true;
	} catch (error: any) {
		console.log("Error from designParkingSystemHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDesignParkingSystemJS = `function ParkingSystem(big, medium, small) {
  // Write your code here.
  // Return an object exposing an "addCar" method.
  return {
    addCar: function(carType) {
      // carType: 1 = big, 2 = medium, 3 = small
    }
  };
};`;

export const designParkingSystem: Problem = {
	id: "design-parking-system",
	title: "277. Design Parking System",
	problemStatement: `<p class='mt-3'>
    Design a parking system for a parking lot with three sizes of spots: big, medium, and small.
  </p>
  <p class='mt-3'>
    <code>ParkingSystem(big, medium, small)</code> &mdash; initializes the number of free slots
    for each size.
  </p>
  <p class='mt-3'>
    <code>addCar(carType)</code> &mdash; where <code>carType</code> is <code>1</code> for big,
    <code>2</code> for medium, or <code>3</code> for small. Parks the car in a spot of the matching
    size if one is free (decrementing that count) and returns <code>true</code>; otherwise returns
    <code>false</code> without changing anything.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `ParkingSystem(1,1,0); addCar(1); addCar(2); addCar(3); addCar(1)`,
			outputText: `null, true, true, false, false`,
			explanation: "There are no small spots, so the third car (type 3) is rejected, and the big spot is already taken.",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= big, medium, small <= 1000</code></li>
  <li class='mt-2'><code>carType</code> is <code>1</code>, <code>2</code>, or <code>3</code>.</li>
  <li class='mt-2'>At most <code>1000</code> calls will be made to <code>addCar</code>.</li>`,
	starterCode: starterCodeDesignParkingSystemJS,
	handlerFunction: designParkingSystemHandler,
	starterFunctionName: "function ParkingSystem(",
	order: 277,
};
