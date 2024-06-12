/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core';
import * as main from '../src/main';

// Mock the action's main function
const runMock = jest.spyOn(main, 'run');

// Mock the GitHub Actions core library
let debugMock: jest.SpiedFunction<typeof core.debug>;
let getInputMock: jest.SpiedFunction<typeof core.getInput>;
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>;
let setOutputMock: jest.SpiedFunction<typeof core.setOutput>;

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    debugMock = jest.spyOn(core, 'debug').mockImplementation();
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation();
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation();
    setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation();
  });

  it('should set output matches to true if input matches regex', () => {
    getInputMock.mockImplementation((name: string) => {
      if (name === 'input') {
        return 'value';
      }
      if (name === 'regex') {
        return 'value';
      }
      return '';
    });

    setOutputMock.mockImplementation((name: string, value: boolean) => {
      expect(name).toBe('matches');
      expect(value).toBe(true);
    });

    main.run();
    expect(runMock).toHaveBeenCalled();

    expect(setOutputMock).toHaveBeenCalled();
    expect(setFailedMock).not.toHaveBeenCalled();
  });

  it('should set output matches to false if input does not match regex', () => {
    getInputMock.mockReturnValueOnce('value');
    getInputMock.mockReturnValueOnce('regex');

    setOutputMock.mockImplementation((name: string, value: boolean) => {
      expect(name).toBe('matches');
      expect(value).toBe(false);
    });

    main.run();
    expect(runMock).toHaveBeenCalled();

    expect(setOutputMock).toHaveBeenCalled();
    expect(setFailedMock).not.toHaveBeenCalled();
  });

  it('should set a failed status if an error is thrown', () => {
    getInputMock.mockImplementation((name: string) => {
      if (name === 'input') {
        throw new Error('Error getting input');
      }
      return '';
    });

    main.run();
    expect(runMock).toHaveBeenCalled();

    expect(setFailedMock).toHaveBeenCalledWith('Error getting input');
    expect(setOutputMock).not.toHaveBeenCalled();
  });

  it('should set a failed status if an unknown error is thrown', () => {
    getInputMock.mockImplementation((name: string) => {
      if (name === 'input') {
        // eslint-disable-next-line no-throw-literal
        throw 'Unknown error';
      }
      return '';
    });

    main.run();
    expect(runMock).toHaveBeenCalled();

    expect(setFailedMock).toHaveBeenCalled();
    expect(debugMock).toHaveBeenCalled();
    expect(setOutputMock).not.toHaveBeenCalled();
  });
});
