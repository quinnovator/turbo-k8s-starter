#!/bin/bash

# Reset Python Virtual Environments
# This script finds all Python packages (with pyproject.toml) and resets their virtual environments

# Print with colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Finding all Python packages in the repository...${NC}"

# Find all directories with a pyproject.toml file
PYTHON_PACKAGES=$(find . -name "pyproject.toml" -not -path "*/node_modules/*" -not -path "*/.venv/*" | xargs dirname)

if [ -z "$PYTHON_PACKAGES" ]; then
  echo -e "${RED}No Python packages found.${NC}"
  exit 1
fi

echo -e "${GREEN}Found the following Python packages:${NC}"
for package in $PYTHON_PACKAGES; do
  echo "  - $package"
done

echo ""
echo -e "${YELLOW}Resetting virtual environments...${NC}"
echo ""

# Track success/failure for each package
SUCCESS_COUNT=0
FAILURE_COUNT=0
FAILED_PACKAGES=""

# Process each Python package
for package in $PYTHON_PACKAGES; do
  echo -e "${YELLOW}Processing: ${NC}$package"
  
  # Change to the package directory
  cd "$package" || { 
    echo -e "${RED}Failed to change to directory: $package${NC}"
    FAILURE_COUNT=$((FAILURE_COUNT + 1))
    FAILED_PACKAGES="$FAILED_PACKAGES\n  - $package (failed to access directory)"
    continue
  }
  
  # Check if there's a .venv directory
  if [ -d ".venv" ]; then
    echo "  Removing existing virtual environment..."
    rm -rf .venv
  else
    echo "  No existing virtual environment found."
  fi
  
  # Run poetry install
  echo "  Installing dependencies with Poetry..."
  if poetry install; then
    echo -e "  ${GREEN}Successfully reset virtual environment for $package${NC}"
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
  else
    echo -e "  ${RED}Failed to install dependencies for $package${NC}"
    FAILURE_COUNT=$((FAILURE_COUNT + 1))
    FAILED_PACKAGES="$FAILED_PACKAGES\n  - $package (poetry install failed)"
  fi
  
  # Return to the original directory
  cd - > /dev/null
  echo ""
done

# Print summary
echo -e "${YELLOW}Summary:${NC}"
echo -e "${GREEN}Successfully reset $SUCCESS_COUNT package(s)${NC}"

if [ $FAILURE_COUNT -gt 0 ]; then
  echo -e "${RED}Failed to reset $FAILURE_COUNT package(s):${NC}"
  echo -e "$FAILED_PACKAGES"
  exit 1
fi

echo -e "${GREEN}All Python virtual environments have been reset successfully!${NC}"
exit 0 