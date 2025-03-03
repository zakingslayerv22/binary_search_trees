export class Tree {
  constructor(array) {
    this.array = array;
    this.rootNode = null;
    this.initialize();
  }

  initialize() {
    this.rootNode = this.buildTree(this.array);
    return this.rootNode;
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

  insert(value) {
    const newNode = new Node(value);

    const rootNode = this.rootNode;

    if (!rootNode) return newNode;

    let parentNode;
    let currentNode = rootNode;

    //determine the node that newNode will
    //be attached to
    while (currentNode) {
      parentNode = currentNode;

      if (value < currentNode.value) {
        currentNode = currentNode.leftNode;
      } else if (value > currentNode.value) {
        currentNode = currentNode.rightNode;
      } else {
        //the value already exists.
        return rootNode;
      }
    }

    //attach newNode
    if (value < parentNode.value) {
      parentNode.leftNode = newNode;
    } else {
      parentNode.rightNode = newNode;
    }

    return rootNode;
  }
}

export class Node {
  constructor(value) {
    this.value = value;
    this.rightNode = null;
    this.leftNode = null;
  }
}
