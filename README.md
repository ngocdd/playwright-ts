# Playwright-TS

This repository contains automated tests written in TypeScript using Playwright. Playwright is a Node.js library that allows you to automate actions in web browsers such as Chrome, Firefox, and Safari.

## Author

- **Name:** [Oliver - Dang Dinh Ngoc]
- **Email:** [ngocdd94@gmail.com]
- **Blog:** [https://dangngocblogs.wordpress.com/]
- **GitHub:** [https://github.com/ngocdd]
- **LinkedIn:** [https://www.linkedin.com/in/ngocdd94/]

## Installation

To get started, clone this repository to your local machine using the following command:

```
https://github.com/ngocdd/playwright-ts.git
```

Navigate to the project directory and install the required dependencies by running the following command:

```
npm run setup
```

## Usage

Encrypting Environment Variables
The repository provides several scripts to help you encrypt environment variables for different environments. These scripts utilize the dotenvenc package to encrypt the environment files.

To encrypt the staging environment variables, run the following command:

```
npm run encrypt-stg-env
```

This command encrypts the environment variables defined in the `.env.stg` file located in the utils/env directory. The encrypted file will be generated as `.stg.enc` in the same directory.

Similarly, you can encrypt the environment variables for the UAT and production environments using the following commands:

```
npm run encrypt-uat-env
npm run encrypt-prod-env
```

These commands encrypt the respective environment files `(env/.env.uat` and `env/.env.prod)` and generate encrypted files with the `.uat.enc` and `.prod.enc` extensions.

If you want to encrypt all the environment files at once, you can use the following command:
s

```
npm run encrypt-env
```

## Running Tests

To run the tests for a specific environment, you can use the provided test scripts. These scripts utilize the dotenv package to load the appropriate environment variables before running the tests.

Before run test we need to set `DOTENVENC_PASS` environment variable by following command:

```
export DOTENVENC_PASS="input the password here"
```

then update bashrc source by following command:

```
source ~/.bashrc
```

To execute the tests using the staging environment variables, run the following command:

```
npm run test-stg
```

This command sets the ENV variable to stg using dotenv and then executes the Playwright tests.

Similarly, you can run the tests using the UAT and production environment variables using the following commands:

```
npm run test-uat
npm run test-prod
```

These commands set the ENV variable to uat and prod respectively before running the tests.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Dependencies

# Development Dependencies

@playwright/test: A test runner for Playwright that allows you to write and execute tests in a simple and concise manner. Version: ^1.35.1

@types/fs-extra: TypeScript definitions for the fs-extra module. Version: ^11.0.1

@types/uuid: TypeScript definitions for the uuid module. Version: ^9.0.2

monocart-reporter: A reporter for Playwright tests. Version: ^1.6.13

typescript: TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Version: ^4.5.2

# Dependencies

@tka85/dotenvenc: A package that provides encryption and decryption functionality for dotenv files. Version: ^4.0.2 GitHub Repository [GitHub Repository](https://github.com/tka85/dotenvenc)

@types/node: TypeScript definitions for Node.js. Version: ^20.3.1

dotenv: Loads environment variables from a file into process.env. Version: ^16.5.0

dotenv-cli: A command-line utility for running scripts with environment variables loaded from a .env file. Version: ^7.2.1

fs-extra: A package that provides additional file system methods beyond the built-in fs module. Version: ^11.1.1

uuid: A package that provides the ability to generate unique identifiers. Version: ^9.0.5

winston: A logger for JavaScript applications. Version: ^3.9.0
