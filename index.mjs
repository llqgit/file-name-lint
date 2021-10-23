#!/usr/bin/env node

"use strict";

// const pkg = require("./package.json");
import { program } from "commander";
import linter from "./linter.mjs";
program
  // .version(pkg.version)
  .option("-d, --debug", "调试模式，打印匹配规则")
  .argument("<dir>", "执行目录")
  .argument("[reg]", "匹配规则", /^[^ ]$|^[^ ].{1}$|^.{1}[^ ]$|^[^ ].*[^ ]$/)
  .argument("[regDesc]", "匹配规则描述", "文件名前后不能有空格")
  .action((dir, reg, regDesc) => {
    console.log("\n开始检查目录:", dir);
    linter(dir, reg, regDesc, program.opts().debug);
  });

program.parse();
