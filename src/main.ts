import * as core from '@actions/core';

/**
 * The main function for the action.
 */
export function run(): void {
  try {
    const input: string = core.getInput('input');

    // Check if the input has a value
    const hasValue: boolean = input.length > 0;

    // Set outputs for other workflow steps to use
    core.setOutput('has-value', hasValue);
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
