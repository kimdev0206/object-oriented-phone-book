const TrieNode = require("./node");
const Database = require("../database");
const { perfTime } = require("../utils");

function Trie() {
  Database.call(this);

  this.root = new TrieNode();
}

Trie.prototype = Object.create(Database.prototype);
Trie.prototype.constructor = Trie;

Trie.prototype.addNode = function ({ name, phone }) {
  let cur = this.root;

  for (const each of name) {
    if (!cur.getChild(each)) cur.setChild(each);

    cur = cur.getChild(each);
  }

  cur.isEndOfWord = true;
  cur.setUserData({ name, phone });
  this.size += 1;
};

Trie.prototype.findNode = function (word) {
  let cur = this.root;

  for (const each of word) {
    const child = cur.getChild(each);

    if (!child) return;

    cur = child;
  }

  return cur.isEndOfWord ? cur : undefined;
};

Trie.prototype.printNodes = function (node = this.root) {
  if (node.isEndOfWord) {
    console.log(`> ${JSON.stringify(node.getUserData())}`);
    return;
  }

  for (const [, child] of node.children) {
    this.printNodes(child);
  }
};

Trie.prototype.removeNode = function (word, node = this.root, idx = 0) {
  if (idx === word.length) {
    if (node.isEndOfWord) {
      node.isEndOfWord = false;
      node.deleteUserData();
      this.size -= 1;
    }

    if (!node.getChildrenSize()) return true;

    return false;
  }

  const char = word[idx];
  const child = node.getChild(char);

  if (!child) return false;

  const shouldDeleteChild = this.removeNode(word, child, idx + 1);

  if (shouldDeleteChild) {
    node.deleteChild(c);

    if (!node.getChildrenSize()) return true;
  }

  return false;
};

Trie.prototype.load = perfTime(function () {
  return Database.prototype.load.call(this);
});

Trie.prototype.save = perfTime(function () {
  let stream = Database.prototype.save.call(this);
  this.traverseNode(stream, this.root);

  stream.end();
});

Trie.prototype.traverseNode = function (stream, node) {
  if (node.isEndOfWord) {
    stream.write(JSON.stringify(node.getUserData()) + "\n");
    return;
  }

  for (const [, child] of node.children) {
    this.traverseNode(stream, child);
  }
};

module.exports = Trie;
