const { defineConfig } = require('cypress')
const { verifyDownloadTasks } = require('cy-verify-downloads');
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')
const { faker } = require('@faker-js/faker');
const xlsx = require("node-xlsx").default;
//🌈🌈 code for multiple config files support 🌈🌈
const fs = require('fs-extra'); //
const path = require('path');
const { error } = require('console');


//🌈🌈 a custom function for multiple config files support 🌈🌈
function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress\\MultipleConfigFiles', `${file}.json`);

  //check if the config file(a JSON file) exists or not
  if (!fs.existsSync(pathToConfigFile)) {
    throw new Error('No custom config file found.');
  }
  //if config file(a JSON file) exists then read
  return fs.readJson(pathToConfigFile);
}


let href;
module.exports = defineConfig({
  //pageLoadTimeout: 10000,
  //defaultCommandTimeout: 20000,
  projectId: 'c6b911',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Conduit POM Report',
    reportTitle: 'Conduit POM Automation Report',
    reportFilename: '[datetime]_[status].html',
    timestamp: "mmm_dd_yyyy_HH-MM-ss-l",
    embeddedScreenshots: true,
    overwrite: false,
    inlineAssets: true,
    saveAllAttempts: false,
    //ignoreVideos:false
    videoOnFailOnly: true
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      //-------🌈🌈 code for multiple config files support 🌈🌈 ---------
      //get the name of config file - local/prod/stage passed from terminal or by-default 'prod'
      //* const file = config.env.configFile || 'prod';
      //* return getConfigurationByFile(file);

      //-------node listener for cy-verify-downloads plugin
      on('task', verifyDownloadTasks);

      //-------node listener for cypress-downloadfile plugin
      on('task', { downloadFile });

      //-------node listener for mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);

      //------node listener for faker-js demoed @ cypress\e2e\FakerJS\faker-demo.cy.js
      on("task", {
        freshUser() {
          let user = {
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            get email() { //using email as getter now possible in ES6
              return this.firstname + "." + this.lastname + "@somemail.com"
            },
            comments: faker.lorem.lines(),
          };
          return user;
        },
      });

      //------node listener to demo cy.task @ cypress\e2e\Miscellaneous\cy-task.cy.js
      //step 1. create a variable (as done in line 24)
      on('task', {
        //step 2. create functions inside on block with first arg as 'task'
        //function to set href
        setHref: function (val) {
          href = val;
          return null;
        },
        //function to get href
        getHref: function () {
          return href;
        },
      })

      //------node listener to demo EXCEL READING @ cypress\e2e\read_write\read_writeExcel.cy.js
      // see also: cypress\support\commands.js
      //Excel implementation
      on("task", {
        parseXlsx({ filePath }) {
          return new Promise((resolve, reject) => {
            try {
              const jsonData = xlsx.parse(fs.readFileSync(filePath));
              resolve(jsonData);
            } catch (e) {
              reject(e);
            }
          });
        },
      });
    },

    //🍌🍌🍌  Exluding spec files/folder from execution : 
    // scenario : Don't suggest any tests under cypress/e2e/advanced-examples folder.
    //(this one is an e2e specific config option)
    //* excludeSpecPattern: 'cypress/e2e/advanced-examples/*.js',
    // 🍌🍌🍌 Setting a base url globally
    //* baseUrl: 'https://google.co.in'
    //🍌🍌🍌 Setting a viewport config globally
    //* viewportHeight : 1334,
    //* viewportWidth : 750,
    //🍌🍌🍌 Setting test retry on global level
    // "retries": {
    //   // Configure retry attempts for `cypress run`
    //   // Default is 0
    //   "runMode": 2,
    //   // Configure retry attempts for `cypress open`
    //   // Default is 0
    //   "openMode": 2
    // },
    testIsolation: true,
    baseUrl: 'https://react-redux.realworld.io' //framework url

  },

  //🍌🍌🍌 setting up env variable on global level
  // env: {
  //   first_name: 'mohanti',
  //   last_name: 'jayati',
  //   email : 'mohanti.jayati@googl.com',
  //   comment: 'Please give me a soul'
  // },
  watchForFileChanges: true

});
