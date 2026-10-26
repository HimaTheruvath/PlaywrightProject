import { expect } from "@playwright/test";

const config = ({
  testDir:'./tests',
  timeout:40*1000,  // timeout if a testcase has some issues and stops it will wait till this time
  expect:{
    timeout:40*1000  // timeout after failed assertion
  },
  reporter:'html',   //this will be the report after each test run for each test case
  use: {
    browserName:'chromium',
    headless:false,
    screenshot:'on',
    trace:'on',
    video:'on'
  }
})
module.exports = config

