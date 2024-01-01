---
title: Docker Explained
date: 2020-07-22T00:14:11-07:00
tags:
  - fruit
  - technical
aliases:
  - ../posts/docker
---

Content from my own ['Docker Explained' repo](https://github.com/jackyzha0/docker-explained). Check out the repository for example code!

## Introduction

### What is Docker?

Docker is a tool that makes it really easy to package applications into self-sustaining 'containers'.

### What are containers?

Containers, as their name suggests, contain things. In the case of Docker, these contain all the parts the application needs to run, everything from libraries and dependencies to the actual source code.

### Why containers?

Containerization means that everything to do with your application stays inside the container. You shouldn't need to worry about how stuff on your machine (e.g. which version of Python you have) affects how your program runs. As a side benefit, this means that Docker containers are dependency-free. Never worry about "oh, it works on my machine" ever again! After a Docker image is created, all of its contents are frozen so it should work exactly the same on your computer as it does for someone else (assuming you both have Docker).

### Why Docker?

Docker makes it super easy to work with these containers and, by proxy, you can get all the cool benefits of containers easily too! It also allows you to programmatically define a container through code, meaning you can collaborate and work on Docker containers just as you would with a regular piece of code through version control like `git`.

## Installing Docker

More detailed instructions can be found [here](https://docs.docker.com/get-docker/).

## Parts of Docker

### Docker Containers

I think the intro covered this pretty well so I'll repeat it again here.

> Containers, as their name suggests, contain things. In the case of Docker, these contain all the parts the application needs to run, everything from libraries and dependencies to the actual source code.

This means that 'containerized' applications don't need to rely on a system to have certain dependencies (e.g. `Node.js`) installed on the user's system to run because the container will have it packaged.

You can think of Docker containers like a fully self-contained and running version of your application.

### Docker Image

You can think of Docker images like a sort of 'template' that describes to Docker how to create a container from scratch. You can build these images by providing instructions on how to build them in the form of layers.

### Layers

Docker images, like ogres (or cakes if you're a boring person), have many layers. The base layer often provides some basic functionality like providing `git`, `bash` or `apt` -- otherwise your container has nothing to run off of! We can then add our own layers on top of that base layer, like installing dependencies, copying files into the image, and defining the command to run when the container starts up. These instructions are programmatically defined through a Dockerfile.

> One of the coolest parts of Docker is that these layers get cached between builds if nothing has changed. That means that if you rebuild an image and only changed the last layer, it'll only need to rebuild the last layer rather than rebuilding the whole image, making for some really fast iteration times.

### Dockerfile

The Dockerfile are the actual specific instructions for how to create the actual image or 'template'. The Dockerfile starts off by defining a 'base-layer', which serve as the basis for your actual image. Some common base layers are `ubuntu` (which contains a minimal install of the actual Ubuntu operating system) and `python` (which contains everything needed to run a basic Python app).

I won't dive into too much details about each command you can use as these will be described more in-depth within the examples. You can find detailed documentation on the commands you can use in a Dockerfile here: https://docs.docker.com/engine/reference/builder/

## Docker CLI

Great, so now I know a little bit about how Docker actually works, how do I get started? First, let's make sure our Docker install works correctly. You can do this by opening your favourite terminal and entering `docker run hello-world`. You should get something that looks like:

```bash
$ docker run hello-world

Hello from Docker.
This message shows that your installation appears to be working correctly.
...
```

Now, let's go over a few basic CLI commands that you'll probably be using as you work with Docker.

### `docker build`

> How do I turn a Dockerfile into an actual image?

To built an image, you can do `docker build . -t <name-of-image>` which tells Docker to look in the current directory for a file called `Dockerfile` and to follow the instructions inside to build an image. After doing so, tag the image so we can easily find it later. Docker image tags let you version your images as well. Say you wanted to build a v1 for your image, you would do `docker build . -t <name-of-image>:v1`. If you have a different name for your Dockerfile, you can also refer to it using the `-f` flag like so: `docker build . -t <name-of-image> -f <name-of-dockerfile>`

More info can be found here: https://docs.docker.com/engine/reference/commandline/build/

### `docker image ls`

> How do I get a list of all the images I've built?

The command will give you an output that looks something like the following.

```bash
REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE
image1                     0.1.1               9eb95c7f06b0        2 days ago          343MB
image2                     <none>              c99ac06cf60a        2 days ago           23MB
...
```

More info can be found here: https://docs.docker.com/engine/reference/commandline/image_ls/

### `docker run`

> How do I create a container from an image?

Now that you've built an image, you can just run it by doing `docker run <name-of-container>:<version>`. More often than not, you can just use the latest version of the image, `docker run <name-of-container>:latest`. However, certain applications (like servers) need to listen on specific ports. By default, Docker doesn't allow containers to use ports on your local machine, but you can allow this by specifying ports using the `-p` flag, `docker run -p <host-port>:<container-port> <name-of-container>`. If your container listens on port 3000, but you want it to appear as port 5000 on your local machine, it would look like `docker run -p 5000:3000 <name-of-container>`

If you want to run your container in the background in a detached manner, you can just add the `-d` flag.

More info can be found here: https://docs.docker.com/engine/reference/commandline/run/

### `docker ps`

> How do I figure out what containers are currently running?

You can get a list of currently running containers by doing `docker ps`, which will give you each container running along with details about its Container ID, what image it was created from, when it was created, as well as which ports are open.

### `docker exec`

> How do I run a command inside a container?

You can use the command `docker exec -it <container name> /bin/bash` to get a bash shell in the container, allowing you to run commands from within the container as if it was a full-fledged machine. If you know specifically what command you want to execute, you can use `docker exec -it <container name> <command>` to execute whatever command you specify in the container.

## Docker Examples

1. [Basic Python app with dependencies](https://github.com/jackyzha0/docker-explained/tree/master/1-basic-python/)
2. [Node.js and Express app](https://github.com/jackyzha0/docker-explained/tree/master/2-basic-node)
3. [Multi-stage Go app](https://github.com/jackyzha0/docker-explained/tree/master/3-multi-stage-go)

## Further reading

These topics will not be talked about within this repository, but I've added a few resources I've found helpful in my understanding of each of them.

### Docker Compose

Docker Compose is a tool that lets you start multiple Docker containers together and configure how they interact.

- https://docs.docker.com/compose/
- https://github.com/docker/compose

## Kubernetes and Microservices

mIcRoSerViCeS you may hear them say. What's all the hype about? Basically, its the [single responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) but applied to services. This means that each responsibility should, ideally, be split out into its own service and be completely responsible for that one thing. This lends itself really easily to Docker and containers. Kubernetes is a system that makes it really easy to deploy, scale, and manage a bunch of containers, making it near ideal in creating a microservices architecture using Docker.

- https://microservices.io/
- https://medium.com/hashmapinc/the-what-why-and-how-of-a-microservices-architecture-4179579423a9
- https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/
- https://kubernetes.io/docs/tutorials/kubernetes-basics/
- https://opensource.com/article/17/11/getting-started-kubernetes

## Deploying to the Cloud

Now that you got some cool new containers? How do I run them in the Cloud like all the other cool kids? Thankfully, Docker makes this super easy too.

### Google Cloud Run (GCR)

> https://cloud.google.com/run

GCR completely manages scaling and deploying your containers for you so you don't need to worry about server management (yay serverless)! Simply upload your images to Google Container Registry, and create a new Cloud Run deployment.

- https://cloud.google.com/run/docs/quickstarts/prebuilt-deploy
- https://cloud.google.com/run/docs/quickstarts/build-and-deploy

### Google Kubernetes Engine (GKE)

> https://cloud.google.com/kubernetes-engine

Want to run your own Kubernetes cluster and have a lot of money to burn? GKE may be right for you! Other than the price, GKE is super user friendly and makes it really easy to manage and visualize your deployments.

### Amazon Fargate

> https://aws.amazon.com/fargate/

Think GCR but Bezos.

- https://medium.com/@ariklevliber/aws-fargate-from-start-to-finish-for-a-nodejs-app-9a0e5fbf6361
