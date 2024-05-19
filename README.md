# todo-eks-client-srv (React Web Server deploy on EKS)
(Deprecated due to switching to Vite for production ready, code build in Vite in both dev and prod env are much faster)

This repository contains a simple React application configured to run inside a Docker container on port 3000.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)

## Getting Started

### 1. Clone the repository

Clone this repository to your local machine using the following command:

### 2. Build the app using Dockerfile
```sh
docker build -t todo-eks-client .
```
### 3. Run and map port 3000 to React app
```sh
docker run -p 3000:3000 todo-eks-client
```
The repo pipeline setup for both manually and automatically deployment using Github Actions to automatically perform following scripts:
  - checkout code
  - install dependencies
  - running test case
  - Build and push image to AWS ECR
  - Update Kubernetes Config file and rollout new update to Kubernetes cluster.
