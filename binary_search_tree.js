export class Tree {
  constructor(array) {
    this.array = array;
    this.intialize();
  }

  intialize() {
    return this.buildTree(this.array);
  }

  prepArray(array) {
    //remove duplicates and sort array
    return array
      .filter((element, index) => array.indexOf(element) === index)
      .sort((a, b) => a - b);
  }

  buildTree(array) {
    const preppedArray = this.prepArray(array);

    const start = 0;
    const end = preppedArray.length - 1;

    if (start > end) return null;

    const middleIndex = Math.floor(preppedArray.length / 2);

    const root = new Node(preppedArray[middleIndex]);

    const leftPart = preppedArray.slice(0, middleIndex);
    const rightPart = preppedArray.slice(middleIndex + 1);

    root.leftNode = this.buildTree(leftPart);
    root.rightNode = this.buildTree(rightPart);

    return root;
  }
}

export class Node {
  constructor(data) {
    this.data = data;
    this.rightNode = null;
    this.leftNode = null;
  }
}
