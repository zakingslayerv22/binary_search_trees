import { Tree } from "./binary_search_tree.js";

const array1 = [1, 2, 3, 4, 5, 6];
const array2 = [1, 2, 3];
const tree = new Tree(array2);

const node = tree.initialize();

const insertedNode = tree.insert(19);

const deleteNode = tree.delete(4);

// console.log(tree.find(3));

console.log(tree);

function printValue(node) {
  console.log(node.value);
}

tree.levelOrder(printValue);

// tree.levelOrder((node) => {
//   console.log(node.value);
// });

tree.preOrder(printValue);

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

prettyPrint(node);
