# Check value regular expression

This GitHub Action allows you to check if the value of a variable matches a
regular rexpression and take action based on a match or not.

It can be used to check if the value of a variable matches a regular expression
and use this information in a conditional statement to take different actions in
a workflow.

## Features

- Check if an input variable matches a regular expression.

## Usage

### Inputs

- `input`: (**Required**) The input value to check. It can be a string, a
  variable, or a secret (e.g. `${{ secrets.MY_SECRET }}`).
- `regex`: (**Required**) The regular expression to match the input value.

### Outputs

- `matches`: A boolean value indicating if the input matches the regular
  expression. It is `true` if the input matches the regular expression, and
  `false` otherwise.

### Example Usage

```yaml
- name: Check value regex
  id: check-my-input
  uses: robandpdx/check-value-regex@v1
  with:
    input: ${{ inputs.MY_VALUE }}
    regex: '^[a-zA-Z0-9_]+$'

- name: Use the output in a conditional statement
  if: steps.check-my-input.outputs.matches == 'true'
  run: echo "The input matches the regular expression"
```

## Development

### Update the Action Code

The [`src/`](./src/) directory contains the source code that will be run when
the action is invoked.

After making changes to the action code, make sure to run the following command
to run all tests, lint the code, and build the final JavaScript action code:

```bash
npm run all
```

> This step is important! It will run [`ncc`](https://github.com/vercel/ncc) to
> build the final JavaScript action code with all dependencies included. If you
> do not run this step, the action will not work correctly when it is used in a
> workflow. This step also includes the `--license` option for `ncc`, which will
> create a license file for all of the production node modules used in your
> project.

## Validate the Action

You can validate the action by referencing it in a test workflow file. For
example, [`ci.yml`](./.github/workflows/ci.yml) demonstrates how to reference
this action in the same repository.

## Publishing a New Release

This project includes a helper script, [`script/release`](./script/release)
designed to streamline the process of tagging and pushing new releases for
GitHub Actions.

GitHub Actions allows users to select a specific version of the action to use,
based on release tags. This script simplifies this process by performing the
following steps:

1. **Retrieving the latest release tag:** The script starts by fetching the most
   recent release tag by looking at the local data available in your repository.
1. **Prompting for a new release tag:** The user is then prompted to enter a new
   release tag. To assist with this, the script displays the latest release tag
   and provides a regular expression to validate the format of the new tag.
1. **Tagging the new release:** Once a valid new tag is entered, the script tags
   the new release.
1. **Pushing the new tag to the remote:** Finally, the script pushes the new tag
   to the remote repository. From here, you will need to create a new release in
   GitHub and users can easily reference the new tag in their workflows.

To use the script, run the following command:

```bash
./script/release
```

## Contributing

Contributions are welcome! Here are some ways you can contribute:

- Report bugs and suggest new features by creating an issue.
- Improve the documentation by submitting a pull request.
- Fix bugs or implement new features by submitting a pull request.

Before submitting a pull request, please make sure that your changes are
consistent with the project's coding style and that all tests pass.
