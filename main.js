import { Tree } from "./binary_search_tree.js";

function generateRandomArray() {
  const array = [];
  for (let i = 0; i < 10; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  return array;
}

const tree = new Tree(generateRandomArray());

const node = tree.initialize();

console.log(tree.isBalanced());

function printValue(node) {
  console.log(node.value);
}

console.log(tree.levelOrder(printValue));
console.log(tree.preOrder(printValue));
console.log(tree.inOrder(printValue));
console.log(tree.postOrder(printValue));

//unbalance the tree
console.log("Unbalancing tree..");

const unbalancingNumbers = [101, 107, 200, 205];

unbalancingNumbers.forEach((number) => tree.insert(number));

console.log(tree.isBalanced());

console.log("Rebalancing tree..");
const rebalancedTree = tree.rebalance();

console.log(tree.levelOrder(printValue));
console.log(tree.preOrder(printValue));
console.log(tree.inOrder(printValue));
console.log(tree.postOrder(printValue));

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(rebalance);
