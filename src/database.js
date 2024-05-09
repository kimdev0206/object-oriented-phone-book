const fs = require("node:fs");
const readline = require("node:readline/promises");

function Database() {
  this.filePath = "assets/data.txt";
  this.size = 0;
}

Database.prototype.addNode = function () {
  throw new Error("구현체에서 호출해주세요.");
};

Database.prototype.findNode = function () {
  throw new Error("구현체에서 호출해주세요.");
};

Database.prototype.printNodes = function () {
  throw new Error("구현체에서 호출해주세요.");
};

Database.prototype.removeNode = function () {
  throw new Error("구현체에서 호출해주세요.");
};

Database.prototype.load = function () {
  const rl = readline.createInterface({
    input: fs.createReadStream(this.filePath),
  });

  rl.on("line", (line) => this.addNode(JSON.parse(line)));

  rl.on("close", () => {
    if (!this.size) {
      console.log("> INFO: 저장된 데이터가 존재하지 않습니다.");
      return;
    }

    console.log("> INFO: (데이터 파일 → 데이터베이스) 복제 완료하였습니다.");
  });
};

Database.prototype.save = function () {
  const stream = fs.createWriteStream(this.filePath);

  if (!this.size) {
    console.log("> INFO: 저장할 데이터가 존재하지 않습니다.");
    stream.end();
  }

  stream.on("finish", () => {
    console.log("> INFO: (데이터 파일 ← 데이터베이스) 복제 완료하였습니다.");
    process.exit(0);
  });

  return stream;
};

Database.prototype.getSize = function () {
  return this.size;
};

module.exports = Database;
