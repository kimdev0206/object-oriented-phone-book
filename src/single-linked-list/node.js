function ListNode({ name, phone }) {
  this.userData = {
    name,
    phone,
  };

  this.next = null;
}

ListNode.prototype.getUserData = function () {
  return this.userData;
};

ListNode.prototype.getName = function () {
  return this.userData.name;
};

module.exports = ListNode;
