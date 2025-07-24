#!/bin/bash

# Script to create a task branch and associated GitHub issue

# Check if task number and description are provided
if [ $# -lt 2 ]; then
  echo "Usage: $0 <task-number> <task-description>"
  echo "Example: $0 3 'database-auth-setup'"
  exit 1
fi

TASK_NUMBER=$1
TASK_DESCRIPTION=$2
BRANCH_NAME="task/$TASK_NUMBER-$TASK_DESCRIPTION"

# Check if we're on main or dev branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "dev" ]; then
  echo "Warning: You are not on main or dev branch. It's recommended to create task branches from these branches."
  read -p "Do you want to continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Create and checkout the new branch
echo "Creating branch: $BRANCH_NAME"
git checkout -b "$BRANCH_NAME"

# Create GitHub issue using GitHub CLI if available
if command -v gh &> /dev/null; then
  echo "Creating GitHub issue for task $TASK_NUMBER..."
  ISSUE_TITLE="Task $TASK_NUMBER: ${TASK_DESCRIPTION//-/ }"

  # Create the issue and get the issue number
  ISSUE_URL=$(gh issue create --title "$ISSUE_TITLE" --body "Implementing task $TASK_NUMBER: ${TASK_DESCRIPTION//-/ }" --label "task")
  ISSUE_NUMBER=$(echo $ISSUE_URL | grep -o '[0-9]*$')

  echo "GitHub issue created: $ISSUE_URL"
  echo "You can reference this issue in your commits using: [#$ISSUE_NUMBER]"
else
  echo "GitHub CLI not found. Please create the issue manually on GitHub."
fi

echo "Task branch created successfully. You can now start working on your task."
echo "When you're done, create a pull request to merge back into dev or main."
