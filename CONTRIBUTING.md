# Contributing Guide

Thank you for your interest in contributing to the **node-nepali-datetime** project!
Your contributions will help improve and enhance this library.
Please take a moment to review the following guidelines before getting started.

## Prerequisites

Before contributing, ensure that you have the following:

- **Node.js v18 or higher** installed. Download it from the [official Node.js website](https://nodejs.org/)
  or use `nvm` to manage multiple Node.js versions.
- **npm** installed (comes with Node.js).

## Getting Started

To set up the project on your local machine, follow these steps:

1. **Fork** the repository on GitHub.
2. **Clone** the forked repository to your local machine:

    ```bash
    git clone https://github.com/<your-username>/node-nepali-datetime.git
    cd node-nepali-datetime
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

4. **Verify your setup**:

    - Run the example script to test the library:

        ```bash
        npm run example
        ```

        Modify the [example.ts](./example.ts) file to experiment with your example code.

    - Run lint checks:

        ```bash
        npm run lint
        ```

    - Run tests to ensure everything works:

        ```bash
        npm run test
        ```

5. **Start contributing** by making the necessary changes to the codebase.

## Code Style

- A **Prettier** configuration file ([`.prettierrc`](./.prettierrc)) is provided to maintain a consistent coding style.
- Pre-commit hooks will automatically format your code before committing. Ensure that your code passes lint checks.

## Pull Requests

We welcome and appreciate pull requests from the community. To contribute:

1. **Fork** the repository and create a new branch based on the `main` branch:

    ```bash
    git checkout -b <your-branch-name>
    ```

2. **Write tests** for your changes if applicable.
3. **Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)** for commit messages.  
   Examples:

    - `feat: add JSON parser`
    - `fix(parser): resolve parsing issue`

4. **Push** your branch to your forked repository:

    ```bash
    git push origin <your-branch-name>
    ```

5. **Create a Pull Request**:

    - Open a pull request from your branch to the `main` branch of the original repository.
    - Provide a clear and concise description of the changes, along with relevant context.

6. **Review & Feedback**:

    - Participate in the code review process and address any feedback promptly.

## License

By contributing to this project, you agree that your contributions will be licensed under the **GPL-3.0 License**.  
Refer to the [LICENSE](./LICENSE) file for more details.

## Other Ways to Contribute

Even if you don’t contribute code, you can still help:

- **Spread the word** about this library.
- Write a blog or article about how you use this project.
- Share your best practices, examples, or ideas with us.

Thank you for contributing to **node-nepali-datetime**! 🎉
