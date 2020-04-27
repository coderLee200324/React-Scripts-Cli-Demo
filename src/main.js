// 找到可执行的核心文件
// 1) 解析用户的参数 commander
const path = require("path");
const { program } = require("commander");
const { version } = require("./constants");

const mapAction = {
  create: {
    alias: "c",
    description: "create a project",
    examples: ["react@cli create project-name"],
  },
  config: {
    alias: "conf",
    description: "config project variable",
    examples: ["react@cli config set <k> <v>", "react@cli config get <k>"],
  },
  "*": {
    alias: "",
    description: "command not found",
    examples: [],
  },
};

Reflect.ownKeys(mapAction).forEach(action => {
  program
    .command(action) // 配置命令的名字
    .alias(mapAction[action].alias) // 命令的别名
    .description(mapAction[action].description) // 命令的描述
    .action(() => {
      // 命令的动作
      if (action === "*") {
        // 访问不到对应的命令
        console.log(mapAction[action].description);
      } else {
        require(path.resolve(__dirname, `actions/${action}`))(
          ...process.argv.slice(3)
        );
      }
    });
});

program.on("--help", () => {
  console.log("\nExamples:");
  Reflect.ownKeys(mapAction).forEach(action => {
    mapAction[action].examples.forEach(example => {
      console.log(`  ${example}`);
    });
  });
});

// 解析用户传递的参数
program.version(version).parse(process.argv);
