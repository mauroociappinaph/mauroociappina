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
  - [x] Require review from Code Owners
- [x] Require status checks to pass before merging
  - [x] Require branches to be up to date before merging
  - Status checks to require:
    - [x] test (CI workflow)
    - [x] lint
    - [x] format-check
    - [x] type-check
    - [x] build
- [x] Require conversation resolution before merging
- [x] Do not allow bypassing the above settings
- [x] Restrict who can push to matching branches (add repository administrators)
- [x] Allow force pushes (only for repository administrators)
- [x] Require linear history
- [x] Require deployments to succeed before merging
  - [x] production environment

## Dev Branch Protection

1. Create another branch protection rule for the `dev` branch
2. Configure the following settings:

- [x] Require pull request reviews before merging
  - [x] Require at least 1 approval
  - [x] Dismiss stale pull request approvals when new commits are pushed
- [x] Require status checks to pass before merging
  - [x] Require branches to be up to date before merging
  - Status checks to require:
    - [x] test (CI workflow)
    - [x] lint
    - [x] format-check
    - [x] type-check
    - [x] build
- [x] Require conversation resolution before merging
- [x] Do not allow bypassing the above settings
- [x] Require linear history

## Feature Branch Workflow

1. Create feature branches from `dev` branch using the naming convention `feature/feature-name`
2. Develop and test on the feature branch
3. Create a pull request to merge into `dev`
4. After review and approval, merge into `dev`
5. Once features are tested on `dev`, create a pull request to merge `dev` into `main`
6. After review and approval, merge into `main` which will trigger automatic deployment

## Automated Branch Protection Setup

You can also set up branch protection rules using the GitHub API or with tools like Terraform. Here's an example of how to set up branch protection rules using the GitHub API:

```bash
# Set up main branch protection
curl -X PUT \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/OWNER/REPO/branches/main/protection \
  -d '{
    "required_status_checks": {
      "strict": true,
      "contexts": ["test", "lint", "format-check", "type-check", "build"]
    },
    "enforce_admins": true,
    "required_pull_request_reviews": {
      "dismissal_restrictions": {},
      "dismiss_stale_reviews": true,
      "require_code_owner_reviews": true,
      "required_approving_review_count": 1
    },
    "restrictions": null,
    "required_linear_history": true,
    "allow_force_pushes": false,
    "allow_deletions": false
  }'

# Set up dev branch protection
curl -X PUT \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/OWNER/REPO/branches/dev/protection \
  -d '{
    "required_status_checks": {
      "strict": true,
      "contexts": ["test", "lint", "format-check", "type-check", "build"]
    },
    "enforce_admins": false,
    "required_pull_request_reviews": {
      "dismissal_restrictions": {},
      "dismiss_stale_reviews": true,
      "require_code_owner_reviews": false,
      "required_approving_review_count": 1
    },
    "restrictions": null,
    "required_linear_history": true,
    "allow_force_pushes": false,
    "allow_deletions": false
  }'
```
