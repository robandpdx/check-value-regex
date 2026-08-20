/**
 * Unit tests for the action's entrypoint, src/index.ts
 */

import { describe, expect, it, jest } from '@jest/globals';

const runMock = jest.fn();

jest.unstable_mockModule('../src/main.js', () => ({
  run: runMock,
}));

describe('index', () => {
  it('calls run when imported', async () => {
    await import('../src/index.js');

    expect(runMock).toHaveBeenCalled();
  });
});
