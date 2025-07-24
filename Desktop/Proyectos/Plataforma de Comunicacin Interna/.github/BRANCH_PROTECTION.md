# Branch Protection Rules

## Main Branch Protection

The `main` branch is protected with the following rules:

1. **Require pull request reviews before merging**
   - At least 1 approval is required
   - Dismiss stale pull request approvals when new commits are pushed
   - Require review from Code Owners

2. **Require status checks to pass before merging**
   - Require branches to be up to date before merging
   - Required status checks:
     - CI build and tests
     - Linting

3. **Require signed commits**

4. **Include administrators**

5. **Restrict who can push to matching branches**
   - Only allow specific people to push to the protected branch

## How to Set Up Branch Protection on GitHub

1. Go to the repository on GitHub
2. Click on "Settings"
3. Click on "Branches" in the left sidebar
4. Under "Branch protection rules", click "Add rule"
5. In the "Branch name pattern" field, enter `main`
6. Configure the protection settings as described above
7. Click "Create" or "Save changes"

## Working with Protected Branches

When working with protected branches, follow these guidelines:

1. Never commit directly to the `main` branch
2. Create feature branches for all changes
3. Submit pull requests to merge changes into `main`
4. Ensure all required status checks pass
5. Obtain necessary code reviews
6. Squash and merge when ready

This protection ensures code quality and prevents accidental changes to the production codebase.
