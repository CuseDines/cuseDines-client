# CuseDines

CuseDines is a food ordering and management portal for Syracuse University's Dining Halls.

## Requirements

1. Node v10 or greater
2. npm package manager
3. Git

## Installation
1. If not installed already install Node.js by following the steps [from here](https://nodejs.org/en/download/). 
Check the installed node version by running this command in your terminal:

```bash
node --version
```

2. npm gets installed by default when you install node. Check the installed npm version by running this command in your terminal:
```bash
npm --version
```
3. Install git by following this guide [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). Check if the git command-line utility has been installed by running this command in your terminal:
```bash
git --version
```
4. On the command-line navigate to a folder where you can clone the project. Once you have navigated to the desired folder, clone the project from github by running this command on the terminal:
```bash
git clone git@github.com:CuseDines/cuseDines-client.git
```
5. Navigate to the project folder by running ```cd cuseDines-client``` on the terminal.
6. Once in  the folder, install all the dependencies:
```bash
npm install
```
7. Once all the dependencies have been installed, to start the project run:
```bash
npm run serve
```
8. On your browser navigate to ``` http://localhost:8080/ ``` to see the project.
9. To build the project for production deployment run:
```bash
npm run build
```
This will create all build files in the ``` dist ```folder. This folder can be used to deploy the application to a web hosting service.



## License
[MIT](https://choosealicense.com/licenses/mit/)
