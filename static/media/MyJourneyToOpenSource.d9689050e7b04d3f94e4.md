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

Choose the first issue, that is tag with `good first issue` to solve real problem that user that used library report to us

