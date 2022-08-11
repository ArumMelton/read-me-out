
import _ from "lodash";
import util from "./util";
import inquirer from "inquirer";
import base from ("inquirer/lib/prompts/base");

class RecursivePrompt extends Base {
  constructor(question, rl, answers) {
    super(question, rl, answers);
    this.question = this.question || question;
    this.responses = [];
  }

  promptForLoop() {
    inquirer.prompt([{
      type: 'confirm',
      message: this.getQuestion(),
      name: 'addMore'
    }]).then(answers => {
      if (answers.addMore === true) {
        this.promptForAnswers();
      } else {
        this.done(this.responses);
      }
    })
  }

  promptForAnswers() {
    inquirer.prompt(this.question.prompts).then(answers => {
      this.responses.push(answers);
      this.promptForLoop();
    });
  }

  _run(cb) {
    this.done = cb;
    this.render();
    this.promptForLoop();
    return this;
  }

  render() {
    // Render a random character as a 'hack'/bugfix
    // If screen.render() isn't called, each line is displayed twice.
    // If nothing is rendered, an empty line will be displayed.
    this.screen.render('\b');
  }
}

module.exports = RecursivePrompt;