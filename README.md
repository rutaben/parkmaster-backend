# Parkmaster

A simple Nodejs application to monitor arriving and departing vehicles and calculate parking fees

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)

## Introduction

Parkmaster is a straightforward React application designed to recognize vehicle data, log it and display in the app and calculate parking fees automatically

## Features

- Recognizes vehicle data such as number plates and vehicle type and logs into database
- Enables manual file upload
- Enables parking fee rate changes

## Getting Started

To run the project on your local development environment, follow the steps below:

### Prerequisites

Node.js and npm must be installed on your machine.

### Installation

Navigate to the project directory in your terminal.
Run the following command to install project dependencies:

- npm install

## Usage

1. Replace database credentials in dataSource file with your database credentials

2. Run build to generate JavaScript files (dist folder)

- npm run build

3. Initialize database schema by running migrations

- npm run migration:run

4. Run the application

- npm run start:dev

## Contact

For any questions and inquiries regarding this project, please feel free to contact me at ruta.bendoraityte@proton.me.
