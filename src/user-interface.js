const readline = require("node:readline/promises");
const { faker } = require("@faker-js/faker");
const { perfTime } = require("./utils");

function UserInterface(database) {
  this.database = database;
  this.database.load();
}

UserInterface.prototype.add = perfTime(function () {
  const name = faker.person.fullName();
  const phone = faker.phone.number();

  const node = this.database.findNode(name);

  if (node) {
    console.error(`> ERROR: ${name}의 정보가 중복됩니다.`);
    return;
  }

  this.database.addNode({ name, phone });
  console.log(
    `> INFO: { name: ${name}, phone: ${phone} } 정보가 저장되었습니다.`
  );
});

UserInterface.prototype.find = perfTime(function (name) {
  const node = this.database.findNode(name);

  if (!node) {
    console.error(`> ERROR: ${name}의 정보가 존재하지 않습니다.`);
    return;
  }

  console.log(
    `> INFO: ${JSON.stringify(node.getUserData())} 정보가 존재합니다.`
  );
});

UserInterface.prototype.print = perfTime(function () {
  this.database.printNodes();

  console.log(`>\n> 총 개수: ${this.database.getSize()}`);
});

UserInterface.prototype.remove = perfTime(function (name) {
  const node = this.database.findNode(name);

  if (!node) {
    console.error(`> ERROR: ${name}의 정보가 존재하지 않습니다.`);
    return;
  }

  const userData = node.getUserData();
  this.database.removeNode(name);

  console.log(`> INFO: ${JSON.stringify(userData)} 정보를 삭제합니다.`);
});

UserInterface.prototype.run = function () {
  this.readline = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "\n> [1] Add [2] Find [3] Print [4] Remove [0] Exit\n",
    terminal: false,
  });

  this.readline.prompt();

  this.readline.on("line", this.listener.bind(this));
  this.readline.on("close", () => this.database.save());
  this.readline.on("SIGINT", () => this.database.save());
};

UserInterface.prototype.listener = async function (line) {
  switch (line.trim()) {
    case "1":
      this.add();

      break;
    case "2": {
      const name = await this.readline.question("> 이름을 입력해주세요: ");
      this.find(name.trim());

      break;
    }
    case "3":
      this.print();

      break;
    case "4": {
      const name = await this.readline.question("> 이름을 입력해주세요: ");
      this.remove(name.trim());

      break;
    }
    case "0":
      this.readline.close();

      break;
    default:
      console.error("> ERROR: 입력값이 유효하지 않습니다.");
  }

  this.readline.prompt();
};

module.exports = UserInterface;
