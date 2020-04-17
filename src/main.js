// 找到要执行的核心文件

const program = require("commander");
const { version } = require("./constants");

const mapActions = {
  create: {
    alias: "c",
    description: "create a project",
    examples: ["react@cli create <project-name>"]
  },
  "*": {
    alias: "",
    description: "command not found",
    examples: []
  }
};

Reflect.ownKeys(mapActions).forEach(action => {
  program
    .command(action) // 配置命令的名字
    .alias(mapActions[action].alias) // 命令的别名
    .description(mapActions[action].description) // 命令对应的描述
    .action(() => {
      if (action === "*") {
        console.log(mapActions[action].description);
      } else {
        console.log(action);
      }
    });
});

program.on("--help", () => {
  console.log("\nExamples:");
  Reflect.ownKeys(mapActions).forEach(action => {
    mapActions[action].examples.forEach(example => {
      console.log(`  ${example}`);
    });
  });
});

program.version(version).parse(process.argv);
