# Git Workflow

## Branch Naming Convention

We use the following branch naming convention:

- `main`: Production-ready code
- `dev`: Development branch for integration
- `task/{task-number}-{short-description}`: Task-specific branches
- `feature/{feature-name}`: Feature branches
- `bugfix/{issue-number}-{short-description}`: Bug fix branches
- `hotfix/{issue-number}-{short-description}`: Hot fix branches for production

## Workflow Steps

1. **Create an Issue**
   - Create an issue in GitHub for each task or feature
   - Add appropriate labels and assign to team members

2. **Create a Branch**
   - Create a branch from `main` or `dev` using the naming convention
   - Example: `task/3-database-auth-setup`

3. **Develop and Commit**
   - Make changes in your branch
   - Commit regularly with descriptive messages
   - Push your branch to the remote repository

4. **Create a Pull Request**
   - When the task is complete, create a pull request to merge into `dev`
   - Reference the issue number in the PR description
   - Request reviews from team members

5. **Code Review**
   - Address any feedback from code reviews
   - Make necessary changes and push updates

6. **Merge**
   - Once approved, merge the PR into `dev`
   - Delete the feature branch after merging

7. **Release**
   - Periodically, create a PR from `dev` to `main` for releases
   - Tag the release with a version number

## Commit Message Guidelines

Follow these guidelines for commit messages:

- Start with a task/issue reference: `[Task-3]`
- Use the imperative mood: "Add", "Fix", "Update", not "Added", "Fixed", "Updated"
- Keep the first line under 50 characters
- Add more detailed description in the body if needed
- Example: `[Task-3] Initialize database and authentication setup`

## Pull Request Template

Use the PR template provided in `.github/pull_request_template.md` when creating pull requests.
