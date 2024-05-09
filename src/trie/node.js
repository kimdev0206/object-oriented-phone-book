function TrieNode() {
  this.children = new Map();
  this.isEndOfWord = false;
}

TrieNode.prototype.getUserData = function () {
  return this.userData;
};

TrieNode.prototype.setUserData = function ({ name, phone }) {
  this.userData = { name, phone };
};

TrieNode.prototype.deleteUserData = function () {
  delete this.userData;
};

TrieNode.prototype.getChild = function (char) {
  return this.children.get(char);
};

TrieNode.prototype.setChild = function (char) {
  this.children.set(char, new TrieNode());
};

TrieNode.prototype.deleteChild = function (char) {
  this.children.delete(char);
};

TrieNode.prototype.getChildrenSize = function () {
  return this.children.size;
};

module.exports = TrieNode;
