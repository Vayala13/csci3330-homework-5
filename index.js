import chalk from 'chalk';
import prompts from 'prompts';
import { randomInt } from 'crypto';
import { writeFileSync, appendFileSync } from 'fs';

const MAX_ATTEMPTS = 3;
const MAX_NUMBER = 10;
const LOG_FILE = 'game-log.txt';

// randomInt leaves out the max, so add 1 to include 10
const secretNumber = randomInt(1, MAX_NUMBER + 1);

// Start each game with an empty log file
writeFileSync(LOG_FILE, '');

// Print a message in color and save the plain text to the log file
function show(message, style = (text) => text) {
  console.log(style(message));
  appendFileSync(LOG_FILE, message + '\n');
}

function validateGuess(input) {
  const text = input.trim();

  if (text === '') {
    throw new Error('A guess is required.');
  }

  const guess = Number(text);

  if (!Number.isInteger(guess)) {
    throw new Error('Guess must be a whole number.');
  }
  if (guess < 1) {
    throw new Error('Guess must be at least 1.');
  }
  if (guess > MAX_NUMBER) {
    throw new Error(`Guess cannot exceed ${MAX_NUMBER}.`);
  }

  return guess;
}

show(' GUESS THE NUMBER!', chalk.magenta.bold);
show('─'.repeat(26), chalk.cyan);
show(`Guess a number between 1 and ${MAX_NUMBER}.`);
show(`You have ${MAX_ATTEMPTS} attempts!`, chalk.yellow);
show('');

let won = false;

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
  const response = await prompts({
    type: 'text',
    name: 'guess',
    message: `Attempt ${attempt}/${MAX_ATTEMPTS}: Enter your guess`
  });

  const input = String(response.guess ?? '');
  appendFileSync(LOG_FILE, `Attempt ${attempt}/${MAX_ATTEMPTS}: Enter your guess … ${input}\n`);

  try {
    const guess = validateGuess(input);

    if (guess === secretNumber) {
      won = true;
      show('');
      show(`YOU WIN! ${secretNumber} was the secret number!`, chalk.green.bold);
      break;
    } else if (guess < secretNumber) {
      show('Too low!', chalk.yellow);
    } else {
      show('Too high!', chalk.yellow);
    }
    show('');
  } catch (error) {
    show(error.message, chalk.red);
  }
}

if (!won) {
  show('');
  show('GAME OVER!', chalk.red.bold);
  show(`The secret number was ${secretNumber}.`);
}

show('');
show('Thanks for playing!', chalk.magenta.bold);
