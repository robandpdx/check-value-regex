import * as core from '@actions/core';

/**
 * The main function for the action.
 */
export function run(): void {
  try {
    const input: string = core.getInput('input');
    const regex: string = core.getInput('regex');

    // Check if the input matches regex
    const matches = input.match(new RegExp(regex, 'g'));

    // Set outputs for other workflow steps to use if matches is not null
    if (matches !== null) {
      core.setOutput('matches', true);
    } else {
      core.setOutput('matches', false);
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      const errorMessage =
        'An error occurred. Run in debug mode for additional info.';
      core.debug(`${JSON.stringify(error)}`);
      core.setFailed(errorMessage);
    }
  }
}
