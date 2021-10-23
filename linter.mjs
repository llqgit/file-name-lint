"use strict";

// const fs = require("fs-extra");
import { globby } from "globby";

export default async function (globbyPath, reg, regDesc, debug) {
  const paths = await globby(globbyPath, { gitignore: true });
  if (debug) {
    console.log(paths);
  }
  let errCount = 0;
  let totalChecked = 0;
  for (let i = 0; i < paths.length; i++) {
    totalChecked++;
    const p = paths[i];
    const fileName = p.replace(/^.*\//, "").replace(/(\..*)?$/, "");
    const matched = fileName.match(reg);
    if (!matched) {
      errCount++;
      console.error(`\n${errCount}. [${p}]`);
      console.error(`file name: [${fileName}]`);
      console.log(`     desc: [${regDesc}]`);
      if (debug) {
        console.log(`      reg: [${reg}]`);
      }
    }
  }

  console.log("\n    Total:", totalChecked);
  if (errCount == 0) {
    console.log("\n---- All File Name OK! (>^ω^<) ----\n");
    return process.exit(0); // 成功退出
  } else {
    console.log("ERR Count:", errCount);
    console.log('\nxxxx ╮(￣▽￣"")╭ xxxx\n\n');
    process.exit(1); // 如果失败直接退出
  }
}

// ^[^ ][0-9a-zA-Z\u4e00-\u9fa5_\-\s\?\.\(\)\\,,\\!\S]*[^ ]$
