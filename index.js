import chalk from 'chalk';
import prompts from 'prompts';
import { randomInt } from 'crypto';

const MAX_ATTEMPTS = 3;
const MAX_NUMBER = 10;

// randomInt leaves out the max, so add 1 to include 10
const secretNumber = randomInt(1, MAX_NUMBER + 1);

console.log(chalk.magenta.bold(' GUESS THE NUMBER!'));
console.log(chalk.cyan('─'.repeat(26)));
console.log(`Guess a number between 1 and ${MAX_NUMBER}.`);
console.log(chalk.yellow(`You have ${MAX_ATTEMPTS} attempts!`));
console.log();

const response = await prompts({
  type: 'text',
  name: 'guess',
  message: `Attempt 1/${MAX_ATTEMPTS}: Enter your guess`
});
