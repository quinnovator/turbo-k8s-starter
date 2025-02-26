#!/bin/bash

# Function to check if Bun is installed and meets the version requirement
check_bun() {
    if command -v bun &> /dev/null; then
        bun_version=$(bun --version)
        if [[ "$bun_version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            if [ "$(printf '%s\n' "1.2" "$bun_version" | sort -V | head -n1)" = "1.2" ]; then
                echo "Bun version $bun_version is installed."
            else
                echo "Bun version $bun_version is installed, but at least version 1.2 is required."
            fi
        else
            echo "Unable to determine Bun version."
        fi
    else
        echo "Bun is not installed."
    fi
}

# Function to check if Python3 is installed
check_python() {
    if command -v python3 &> /dev/null; then
        echo "Python3 is installed."
    else
        echo "Python3 is not installed."
    fi
}

# Function to check if Go is installed
check_go() {
    if command -v go &> /dev/null; then
        echo "Go is installed."
    else
        echo "Go is not installed."
    fi
}

# Function to check if a command is installed, and offer to install it via brew if not
check_and_install() {
    local cmd=$1
    local package=${2:-$1}
    if command -v "$cmd" &> /dev/null; then
        echo "$cmd is installed."
    else
        echo "$cmd is not installed."
        if command -v brew &> /dev/null; then
            read -p "Do you want to install $package using brew? (y/n) " answer
            case "${answer,,}" in
                y|yes)
                    brew install "$package"
                    if [ $? -eq 0 ]; then
                        echo "$package installed successfully."
                    else
                        echo "Failed to install $package."
                    fi
                    ;;
                *)
                    echo "$package will not be installed."
                    ;;
            esac
        else
            echo "Brew is not available to install $package."
        fi
    fi
}

# Function to check if Docker is installed and running
check_docker() {
    if command -v docker &> /dev/null; then
        echo "Docker is installed."
        if docker info &> /dev/null; then
            echo "Docker is running."
        else
            echo "Docker is not running. Please start Docker."
        fi
    else
        echo "Docker is not installed. Please install Docker."
    fi
}

# Function to check if kubectl is installed and connected to a cluster
check_kubectl() {
    if command -v kubectl &> /dev/null; then
        echo "kubectl is installed."
        if kubectl cluster-info &> /dev/null; then
            echo "A Kubernetes cluster is connected."
        else
            echo "No Kubernetes cluster is connected."
        fi
    else
        echo "kubectl is not installed."
    fi
}

# Perform all checks in the specified order
check_bun
check_python
check_go
check_and_install k6
check_docker
check_and_install skaffold
check_kubectl