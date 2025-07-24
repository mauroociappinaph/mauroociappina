# Branch Protection Rules

This document outlines the branch protection rules that should be set up in the GitHub repository settings.

## Main Branch Protection

1. Go to the repository settings
2. Navigate to "Branches" section
3. Click "Add rule" next to "Branch protection rules"
4. Configure the following settings for the `main` branch:

- [x] Require pull request reviews before merging
  - [x] Require at least 1 approval
  - [x] Dismiss stale pull request approvals when new commits are pushed
- [x] Require status checks to pass before merging
  - [x] Require branches to be up to date before merging
  - Status checks to require:
    - [x] test (CI workflow)
    - [x] lint
    - [x] type-check
- [x] Require conversation resolution before merging
- [x] Do not allow bypassing the above settings
- [x] Restrict who can push to matching branches (add repository administrators)

## Dev Branch Protection

1. Create another branch protection rule for the `dev` branch
2. Configure the following settings:

- [x] Require pull request reviews before merging
  - [x] Require at least 1 approval
- [x] Require status checks to pass before merging
  - [x] Require branches to be up to date before merging
  - Status checks to require:
    - [x] test (CI workflow)
    - [x] lint
    - [x] type-check
- [x] Require conversation resolution before merging

## Feature Branch Workflow

1. Create feature branches from `dev` branch using the naming convention `feature/feature-name`
2. Develop and test on the feature branch
3. Create a pull request to merge into `dev`
4. After review and approval, merge into `dev`
5. Once features are tested on `dev`, create a pull request to merge `dev` into `main`
6. After review and approval, merge into `main` which will trigger automatic deployment
