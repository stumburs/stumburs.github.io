---
layout: page
title: Simplicity
---

# Build systems and dev bloat

I recently opened Visual Studio (not Code) for a small C++ thing, for the first time in a few years, and it was so tedious to just set up a basic project.

## The tool you need before you can build

For the past couple years I've been using VS Code, **gcc**/**g++** and **make**, all from **build-essential** on Linux, or the equivalent from **mingw**/**ucrt** on Windows. Nothing is tied to an IDE, nothing needs a license, and every file in the project is understandable and "basic" by comparison.

I know Make isn't perfect. Getting correct header dependency tracking requires using **-MMD -MP** and whatnot, but it's _one_ tool, it's already installed, and when it breaks I can read the Makefile and see why.

Then there's everything else: **cmake**, **meson**, **autotools**, **ninja**, **maven**, **gradle**, **bazel**... Look at what a lot of these actually do: CMake mostly generates Makefiles. So now your build tool needs a build tool. You write **CMakeLists.txt** in a language that's its own thing, to generate a file for another program, to finally run the compiler. Why not write the Makefile yourself in the first place?

I can see why CMake exists. If you need one project to build on Windows, Linux and macOS, creating native project files is a an advantage. But for hobby projects, it's a lot of pain and suffering to end up with a Makefile I could've written myself.

## Gradle

I once had to update a single **very basic** Java plugin for my Minecraft server that's 6 .java source files containing only ~400 lines of code. Simple enough, clone the repo, change a version, and build.

So I installed IntelliJ because that's what the project uses and is generally preferred, I opened the project, and then waited. For **30 minutes**, my CPU sat at 100% while Gradle downloaded and cached things for what is a very small project.

A small and trivial change shouldn't require an entire industrial grade download and setup.

## What it should look like

This is why I like Go. The language's own tool does the job:

- **go build** - builds it
- **go test** - tests it
- **go fmt** - formats it
- **go mod** - handles dependencies
- **GOOS=linux GOARCH=arm64 go build** - cross-compiles, with nothing extra to install

![It just works](https://media1.tenor.com/m/rkI1a8s2Z6QAAAAd/todd-howard-it-just-works.gif)

You don't have to choose between countless build systems which all do the same thing in a slightly different way, using a slightly different language that you then have to learn on the side.

That same general idea works for C and C++ as well. [tsoding's **nob.h**](https://github.com/tsoding/nob.h){:target="\_blank" rel="noopener noreferrer"} is a very small library where the build script is just a C program, the same language you write your project in. You compile it once and run it, and it builds your project however you want. There's no new language to learn, because you already know C.

# To be continued sometime
