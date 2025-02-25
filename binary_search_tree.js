export class Tree {
  constructor(array) {
    this.array = array;
  }

  prepArray(array) {
    //remove duplicates and sort array
    return array
      .filter((element, index) => array.indexOf(element) === index)
      .sort((a, b) => a - b);
  }
}

export class Node {
  constructor(value) {
    this.value = value;
    this.rightNode = null;
    this.leftNode = null;
  }
}
