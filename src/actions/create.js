const axios = require("axios");
const ora = require("ora");
const Inquirer = require("inquirer");
const chalk = require("chalk");
// const { jsonGet } = require("../utils/request");
// create 的逻辑
// create 的功能是创建项目

// 1.拉取所有项目 project-name
// 2.显示所选项目的版本号 version

const waitFnLoding = (fn, message) => async (...args) => {
  const spinner = ora(chalk.yellow(message));
  spinner.start();
  const result = await fn(...args);
  spinner.succeed();
  return result;
};

const fetchRepoList = async () => {
  const { data } = await axios.get(
    "https://api.github.com/users/coderLee200324/repos"
  );
  return data;
};

// 获取tags列表
const fetchTagList = async repo => {
  const { data } = await axios.get(
    `https://api.github.com/repos/coderLee200324/${repo}/tags`
  );
  return data;
};
// https://api.github.com/users/coderLee200324/repos  获取用户下的仓库
module.exports = async projectName => {
  // console.log("jsonGet", jsonGet());
  console.log("create", projectName);
  // 1 获取项目的所有模板
  let repos = await waitFnLoding(fetchRepoList, "fetch templete ...")();

  repos = repos.map(repo => repo.name);
  // 在获取之前显示loding
  // 选择模板 inquirer
  const { repo } = await Inquirer.prompt({
    name: "repo", // 获取选择后的结果
    type: "checkbox",
    message: "please choise a templete to creat project",
    choices: repos
  });
  // 通过当前的项目 拉取对应的版本
  // https://api.github.com/repos/coderLee200324/RepositoryVersion/tags
  let tags = await waitFnLoding(fetchTagList, "fetch tags ...")(repo);
  tags = tags.map(tag => tag.name);
  const { tag } = await Inquirer.prompt({
    name: "tag", // 获取选择后的结果
    type: "list",
    message: "please choise a tag to creat project",
    choices: tags
  });
  console.log(repo, tag);

  // 下载模板
};
