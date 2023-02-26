#!/usr/bin/env node   

//used to tell os to run the code with the nide.js version
// modules used are chalk, chalk-animation, figlet, gradient-string, inquirer, nanospinner
//the code is run in the terminal (command line interface) using node.js
import chalk from 'chalk';
import chalkanimation from 'chalk-animation'; //animation for design
import figlet from 'figlet';// creates a ASCII for a given string in a specified format
import gradient from 'gradient-string';//it provides a color gradient to the ASCII text-string
import inquirer from 'inquirer'; //collect user input from cli
import { createSpinner } from 'nanospinner';// used to create a loading spinner during the time of verification. it also provides a tick or a cross mark
//if the answer is correct (tick), else it is (cross)

let playerName;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms)); //each animation should be shown as all cannot be executed at the same time

async function stage() {
  const rainbowTitle = chalkanimation.rainbow( //provides ux animation to the title
    "kaun banega crorepathi? \n"
  );

  await sleep(); //allows the title to animate for 3 seconds and stops
  rainbowTitle.stop(); //stop the animation and move to the next phase
  
  //main code starts
  //backticks'' are used to create mulitline logs without manually including line break charecters
    
  console.log(` 
    ${chalkanimation.rainbow("HOW TO PLAY?")}
    There will be 5 questions.
    each question is worth 20,00,000 rupees.
    if you get all 5 right, you win ${chalk.bgGreen('1 crore rupees')}
    If you get any question wrong, you won't win anything and you ${chalk.bgRed('lose the game')}
  `);

  rainbowTitle.stop()//stop the animation and move to the next 
}

async function input() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input", //how the info is collected, like a form
    message: "What is your name?",
    default() {
      return "Player";
    },
  });
  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question1",
    type: "list", //we use list as it gives us multiple choices to choose from (1-5)
    message: " How is an array initialized in C language?\n",
    choices: [
      "int a = {1,2,3}",
      "int a[] = new int[3]",
      "int a[3]= {1,2,3}",
      "int a(3)= {1,2,3}",
    ],
  });
  return answers.question1 === "int a[3]= {1,2,3}";
}

async function question2() {
    const answers = await inquirer.prompt({
      name: "question2",
      type: "list",
      message: "Translator which is used to convert codes of assembly language into machine language is termed as\n",
      choices: [
        "Assembler",
        "Attempter",
        "Compiler",
        "Debugger",
      ],
    });
    return answers.question2 === "Assembler";
  }

  async function question3() {
    const answers = await inquirer.prompt({
      name: "question3",
      type: "list",
      message: "Who invented Java Programming?",
      choices: [
        "Guido van Rossum",
        "Dennis Ritchie",
        "Bjarne Stroustrup",
        "James Gosling",
      ],
    });
    return answers.question3 === "James Gosling";
  }

  async function question4() {
    const answers = await inquirer.prompt({
      name: "question4",
      type: "list",
      message: " Which of the following is not an OOPS concept in Java?\n",
      choices: [
        "Polymorphism",
        "Inheritance",
        "Compilation",
        "Encapsulation",
      ],
    });
    return answers.question4 === "Compilation";
  }

  async function question5() {
    const answers = await inquirer.prompt({
      name: "question5",
      type: "list",
      message: "Which of these is a Programming Language?\n",
      choices: [
        "Node.js",
        "Typescript",
        "React.js",
        "HTML",
      ],
    });
    return answers.question5 === "Typescript";
  }

  //now we use a function to handle the correct answer and takes a Boolean as its arguement
  //from module nanospinner we create a loading spinner when it takes time to verify the answer using correct_Answer funstion
async function correct_Answer(correct) {
  const spinner = createSpinner("Checking correct_Answer...").start();
  await sleep();
  if (correct) {
    spinner.success({
      text: `Nice work ${playerName}. That's the Right Answer!!!`,
    }); 
  } else {
    spinner.error({ text: `Game over ${playerName}! you have lost 1 crore rupees. Try again next time!` });
    process.exit(1); // we used exit(1) to exit the function when the output is fales (1)
  }
  // if the if condition is true, it displays a tick mark
  // else it displays a cross for the wrong answer
}

function winner() {
  console.clear();
  const msg = `Congratulation ${playerName} !\n you won 1 , 0 0 , 0 0 , 0 0 0 r `;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}// figlet provides a ASCII charecter for the message and the gradient paste1 is used on the ASCII charecter

//execute the code by using defined functions

await stage();
await input();
await correct_Answer(await question1());
await correct_Answer(await question2());
await correct_Answer(await question3());
await correct_Answer(await question4());
await correct_Answer(await question5());
await winner();
