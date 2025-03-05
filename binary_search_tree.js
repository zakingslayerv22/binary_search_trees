export class Tree {
  constructor(array = []) {
    this.array = array;
    this.rootNode = this.array.length > 0 ? this.buildTree(this.array) : null;
    this.initialize();
  }

  initialize() {
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

    if (!rootNode) {
      return (this.rootNode = newNode);
    }

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

  delete(value) {
    let parentNode = null;
    let targetNode = this.rootNode;

    //tranverse the tree to find the target node
    while (targetNode && targetNode.value !== value) {
      parentNode = targetNode;
      if (value < targetNode.value) {
        targetNode = targetNode.leftNode;
      } else if (value > targetNode.value) {
        targetNode = targetNode.rightNode;
      }
    }

    if (!targetNode) {
      return this.rootNode;
    }

    if (!targetNode.leftNode && !targetNode.rightNode) {
      //leaf node case
      if (parentNode.leftNode === targetNode) {
        parentNode.leftNode = null;
      } else if (parentNode.rightNode === targetNode) {
        parentNode.rightNode = null;
      }
    } else if (!targetNode.leftNode || !targetNode.rightNode) {
      //target has at least one node
      let replacementNode = !targetNode.leftNode
        ? targetNode.rightNode
        : targetNode.leftNode;

      //if target node is root node (it has no parent)
      if (!parentNode) {
        return (this.rootNode = replacementNode);
      }

      if (parentNode.leftNode === targetNode) {
        parentNode.leftNode = replacementNode;
      } else {
        parentNode.rightNode = replacementNode;
      }
    } else {
      //target node has 2 children

      let parent = null;
      let successor = targetNode.rightNode;

      while (successor.leftNode) {
        parent = successor;
        successor = successor.leftNode;
      }

      // no traversal. parent is null.
      // No parent.
      // it did not get to the while loop
      // because the inorder successor
      // is the target's right node.
      // The target's right node
      // does not have any left
      // to tranverse. No minimum
      // element. if(!parent)
      if (parent) {
        parent.leftNode = successor.rightNode;
      } else {
        targetNode.rightNode = successor.rightNode;
      }

      targetNode.value = successor.value;
    }
    return this.rootNode;
  }

  find(value) {
    let targetNode = this.rootNode;

    while (targetNode && targetNode.value !== value) {
      if (value < targetNode.value) {
        targetNode = targetNode.leftNode;
      } else if (value > targetNode.value) {
        targetNode = targetNode.rightNode;
      }
    }
    return targetNode;
  }
}

export class Node {
  constructor(value) {
    this.value = value;
    this.rightNode = null;
    this.leftNode = null;
  }
}
