const UserInterface = require("./src/user-interface");

(function () {
  try {
    const command = process.argv[2];

    if (!command)
      throw new Error(
        "자료구조 입력값과 같이 실행 해주세요. [1] 단일 연결 리스트 [2] 트라이"
      );

    switch (command) {
      case "1": {
        const SingleLinkedList = require("./src/single-linked-list");
        var database = new SingleLinkedList();

        console.log("> INFO: 단일 연결 리스트를 데이터베이스로 사용합니다.");
        break;
      }

      case "2": {
        const Trie = require("./src/trie");
        var database = new Trie();

        console.log("> INFO: 트라이를 데이터베이스로 사용합니다.");
        break;
      }
    }

    const ui = new UserInterface(database);

    ui.run();
  } catch (error) {
    console.error(`> ERROR: ${error.message}`);
  }
})();
