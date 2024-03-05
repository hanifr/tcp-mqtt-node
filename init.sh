#!/bin/bash

# Colors
_RED=`tput setaf 1`
_GREEN=`tput setaf 2`
_YELLOW=`tput setaf 3`
_BLUE=`tput setaf 4`
_MAGENTA=`tput setaf 5`
_CYAN=`tput setaf 6`
_RESET=`tput sgr0`

VERSION=1.0

# printing greetings
echo "${_GREEN}tcp server deployment setup script v$VERSION.${_RESET}"
echo "${_GREEN}(please report issues to tronexia@gmail.com email with full output of this script with extra \"-x\" \"bash\" option)${_RESET}"
echo

# update the OS
if ! sudo apt update; then
    echo "${_RED}ERROR: Failed to update the OS.${_RESET}" >&2
    exit 1
fi

sleep 2
echo "${_YELLOW}Docker Installation :: started.${_RESET}"
echo

if ! 
sudo apt-get remove --auto-remove docker docker-engine docker.io containerd runc docker-ce docker-ce-cli; 
then
    echo "${_RED}ERROR: Failed to remove old Docker packages.${_RESET}" >&2
    exit 1
fi

sleep 2

if ! sudo apt-get update && \
    sudo apt-get install -y ca-certificates curl gnupg lsb-release && \
    sudo mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && \
    sudo apt-get update && \
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin; then
    echo "${_RED}ERROR: Failed to install Docker.${_RESET}" >&2
    exit 1
fi

echo "${_YELLOW}Docker Installation :: completed.${_RESET}"
echo

sleep 2
echo "${_GREEN}(Creating .env file for docker-compose deployment)${_RESET}"
echo

# Create .env file
if ! touch .env; then
    echo "${_RED}ERROR: Failed to create .env file.${_RESET}" >&2
    exit 1
fi

# Add the required environment variables to the .env file
read -p "Enter the domain name (e.g., www.yourdomain.com): " TCP_HOST
read -p "Enter the email address for SSL layer: " TCP_EMAIL
read -p "Enter the TCP port number: " TCP_PORT
read -p "Enter the MQTT broker: " MQTT_BROKER
read -p "Enter the MQTT port: " MQTT_PORT
read -p "Enter the MQTT Topic: " MQTT_TOPIC

echo "TCP_HOST=$TCP_HOST" >> .env
echo "TCP_EMAIL=$TCP_EMAIL" >> .env
echo "TCP_PORT=$TCP_PORT" >> .env
echo "MQTT_BROKER=$MQTT_BROKER" >> .env
echo "MQTT_TOPIC=$MQTT_TOPIC" >> .env

# Make the .env file only readable by the current user
if ! chmod 600 .env; then
    echo "${_RED}ERROR: Failed to set permissions on .env file.${_RESET}" >&2
    exit 1
fi

echo "${_GREEN}Setup complete.${_RESET}"
sleep 2
# Deploy the application using Docker Compose
echo "${_YELLOW}Deploying the application...${_RESET}"
docker-compose up -d

echo "${_GREEN}Application deployed successfully!${_RESET}"