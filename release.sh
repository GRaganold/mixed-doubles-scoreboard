#!/bin/bash

# Step 1: Create a new branch
echo "Enter the name of the new branch:"
read branch_name

# Create the branch and switch to it
git checkout -b "$branch_name"

# Step 2: Stage all changes
echo "Staging all changes..."
git add .

# Step 3: Commit changes
echo "Enter your commit message:"
read commit_message

git commit -m "$commit_message"

# Step 4: Pull the latest changes from the main branch (optional)
echo "Pulling the latest changes from the remote main branch..."
git pull origin main

# Step 5: Tag the release
echo "Enter the version tag (e.g., v1.0.0):"
read tag_version

git tag "$tag_version"

# Step 6: Push the changes and the tag to the remote repository
echo "Pushing changes and tag to the remote repository..."
git push origin "$branch_name"
git push origin "$tag_version"

# Step 7: Optionally create a release on GitHub (if you have the GitHub CLI installed)
echo "Do you want to create a release on GitHub? (y/n)"
read create_release

if [ "$create_release" == "y" ]; then
    echo "Enter release title:"
    read release_title
    echo "Enter release notes:"
    read release_notes
    
    gh release create "$tag_version" --title "$release_title" --notes "$release_notes"
fi

echo "Release process complete!"
