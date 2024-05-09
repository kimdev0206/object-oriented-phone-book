const ListNode = require("./node");
const Database = require("../database");
const { perfTime } = require("../utils");

function SingleLinkedList() {
  Database.call(this);

  this.head = null;
}

SingleLinkedList.prototype = Object.create(Database.prototype);
SingleLinkedList.prototype.constructor = SingleLinkedList;

SingleLinkedList.prototype.addNode = function ({ name, phone }) {
  let newNode = new ListNode({ name, phone });

  if (!this.head) {
    this.head = newNode;
    this.size += 1;
    return;
  }

  newNode.next = this.head;
  this.head = newNode;
  this.size += 1;
};

SingleLinkedList.prototype.findNode = function (name) {
  let cur = this.head;

  while (cur) {
    if (cur.getName() === name) return cur;

    cur = cur.next;
  }
};

SingleLinkedList.prototype.printNodes = function () {
  let cur = this.head;
  let i = 1;

  while (cur) {
    console.log(`> ${i}: ${JSON.stringify(cur.getUserData())}`);
    i += 1;

    cur = cur.next;
  }
};

SingleLinkedList.prototype.removeNode = function (name) {
  let prev = null;
  let cur = this.head;

  if (!cur.next) this.head = null;

  while (cur) {
    if (prev && cur.getName() === name) {
      prev.next = cur.next;
    } else {
      prev = cur;
    }

    cur = cur.next;
  }

  this.size -= 1;
};

SingleLinkedList.prototype.load = perfTime(function () {
  Database.prototype.load.call(this);
});

SingleLinkedList.prototype.save = perfTime(function () {
  let stream = Database.prototype.save.call(this);
  let cur = this.head;

  while (cur) {
    stream.write(JSON.stringify(cur.getUserData()) + "\n");
    cur = cur.next;
  }

  stream.end();
});

module.exports = SingleLinkedList;
