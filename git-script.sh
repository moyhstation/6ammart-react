#!/bin/bash

# Add all files in the current directory and its subdirectories to the Git repository
git add .

# Prompt the user for the commit message
read -p "Enter commit message: " message

# Commit the changes
git commit -m "$message"