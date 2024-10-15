# My Journey to Contributing to Apache Beam

## Introduction

Writing lines of code that is used by thousand of developer have always drawn my intrigution. 

After exploring various open-source repositories, I decided to make my first contribution to [Apache Beam](https://beam.apache.org/), a unified programming model for defining and executing data processing pipelines.

## Why Apache Beam?

Apache Beam caught my interest because of its:

- **Comprehensive model**: It provides a flexible, developer-friendly API to build data pipelines across multiple languages.
- **Multi-environment support**: You can run Beam on multiple runners like Apache Flink, Apache Spark, and Google Cloud Dataflow.
- **Open-source nature**: With contributions from developers worldwide, I felt it was the perfect project to gain hands-on experience with a mature, production-grade codebase.

## Getting Started

### Setting Up the Environment

To begin, I needed to clone the repository and set up my development environment. I followed these steps:

1. **Cloned the repository**:
  ```bash
  git clone https://github.com/apache/beam.git
  cd beam
  ```
2. **Set up the virtual environment**:
  ```bash
  python -m venv venv
  source venv/bin/activate  # On Windows use `venv\Scripts\activate`
  ```

3. **Installed the necessary dependencies**:
  ```bash
  pip install -r sdks/python/requirements.txt
  ```

4. **Built the project**:
  ```bash
  ./gradlew build
  ```

With the environment set up, I was ready to dive into the codebase and start contributing.

### Finding an Issue

I navigated to the [Apache Beam GitHub issue tracker](https://github.com/apache/beam/issues) and filtered the issues using the `good first issue` tag. These issues are specifically designed to be approachable for newcomers and often include clear problem descriptions, as well as links to relevant parts of the codebase or documentation. It’s a great way to solve a real problem while easing into the contribution process.

After browsing a few issues, I found one that was both interesting and solvable with my current skill set. The issue reported a documentation inconsistency in the Python SDK where certain code examples were out of date or didn’t align with the latest API. This was a problem that affected developers trying to use the SDK based on the documentation, as they might encounter errors or confusion due to the mismatched examples.

### Solving a Real Problem

Contributing to open-source isn’t just about writing code; it’s about solving real problems that affect the end users of the project. In this case, the documentation issue I chose to work on had been reported by developers using Apache Beam who encountered errors due to outdated examples. Fixing this issue would improve the overall developer experience, ensuring that others can use the library more effectively.

I carefully followed these steps to address the issue:

1. **Reproduced the problem**: Before making any changes, I verified that the problem existed by trying out the problematic code examples. This step is crucial in understanding exactly what the users are experiencing and helps in crafting an accurate solution.

2. **Investigated the codebase**: I explored the Apache Beam repository to understand the structure of the Python SDK documentation. I located the relevant files that needed updates.

3. **Fixed the documentation**: Once I identified the source of the problem, I updated the outdated examples and ensured that they were aligned with the current API.

4. **Tested the solution**: To avoid introducing new issues, I tested the updated examples to ensure they worked as expected with the latest version of Apache Beam. This step involved running the examples locally and making sure they produced the correct results.

5. **Submitted a Pull Request (PR)**: After making the changes, I opened a PR with a detailed description of the problem, the steps I took to fix it, and a link to the related issue. This transparency helps the maintainers understand my approach and verify the correctness of the fix.

By fixing this issue, I helped ensure that future users of the Python SDK wouldn't run into the same documentation problems, contributing to a smoother developer experience for the community.

### The Review Process

Once the PR was submitted, it was reviewed by one of the project maintainers. They provided feedback and suggestions on how I could improve the quality of the changes. After incorporating the feedback, the PR was approved and eventually merged into the main branch. Seeing my contribution go live and knowing that it helped improve the project for other users was a rewarding experience.


