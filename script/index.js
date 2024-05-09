const fs = require("node:fs");
const { faker } = require("@faker-js/faker");
const { perfTime } = require("../src/utils");

// NOTE: 변경 가능합니다.
const size = 1000;

perfTime(function () {
  let stream = fs.createWriteStream("assets/data.txt");

  for (let i = 0; i < size; i += 1) {
    const name = faker.person.fullName();
    const phone = faker.phone.number();

    stream.write(JSON.stringify({ name, phone }) + "\n");
  }

  stream.on("finish", () => {
    console.log(`> INFO: ${size} 개의 데이터를 파일에 삽입 하였습니다.`);
    process.exit(0);
  });

  stream.end();
})();
