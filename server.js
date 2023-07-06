const express = require("express"); // import express

const axios = require("axios"); // import axios

const createCsvWriter = require("csv-writer").createObjectCsvWriter; // import csv-writer

const app = express(); // initialize express

const { utils } = require("ethers"); // importing

require("dotenv").config(); // import dotenv

class Block {
  constructor(timeStamp, blockReward) {
    //  THIS IS WHERE YOU WILL ADD THE CODE TO CREATE A BLOCK
    this.timeStamp = timeStamp;
    this.blockReward = blockReward;
  }
}

const fetchData = async () => {
  try {
    const listOfBlocks = []; // create an empty array to store the blocks
    for (let blockNumber = 1746953; blockNumber < 1746958; blockNumber++) {
      // loop through the blocks
      const apiUrl = `https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${blockNumber}&apikey=${process.env.API_KEY}`; // create the api url

      const response = await axios.get(apiUrl); // make the api call
      const blockRewards = utils.formatEther(response.data.result.blockReward); // get the block rewards
      const timeStamp = response.data.result.timeStamp; // get the timestamp
      const block = new Block(timeStamp, blockRewards); // create a new block
      listOfBlocks.push(block); // add the block to the array
    }
    exportToCsv(listOfBlocks); // export the data to csv
  } catch (error) {
    console.log(error);
  }
};

// export data to csv using csv-writer function
const exportToCsv = async (data) => {
  const createCsvWriter = require("csv-writer").createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: "blockRewards.csv",
    header: [
      { id: "timeStamp", title: "timeStamp" },
      { id: "blockReward", title: "blockReward" },
    ],
  });
  await csvWriter
    .writeRecords(data)
    .then(() => {
      console.log("...Done");
    })
    .catch((error) => console.log(error));
};

(async () => {
  try {
    await fetchData();
    app.listen(3000, () => console.log("Server running on port 3000")); // listen for requests on port 3000
  } catch (error) {
    console.log(error);
  }
})();
