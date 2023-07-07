# Miner Rewards Prediction

## Overview
This is an AI-Blockchain project in which we predict miner rewards from existing dataset fetched live from blockchain.

## Dataset
The dataset is fetched from [EtherScan](https://etherscan.io/) using [EtherScan API](https://etherscan.io/apis). The dataset contains the following features:
- `blockNumber`: Block Number
- `timeStamp`: Timestamp


## Model
We have used a simple Linear Regression model to predict the miner rewards. The model is trained on the dataset and the model is saved in the `model` directory.

## Usage
To run the project, follow the steps below:
- Clone the repository
-  `cd` into the directory
-  install dependencies by typing yarn install
-  look upto colab file for running python side of the project
-  it is done. 
