<p align="center">
 <img src="https://53.fs1.hubspotusercontent-na1.net/hubfs/53/Fergals/Foleon%20Logo.png" width="200" alt="foleon Logo" />
</p>

  <p align="center">Backend Assignment for Foleon </p>

## Description

In this project I designed a service responsible for 3 entities - Projects, documents and Elements.
This is a POC, In this project I implemented routes for creating, updated and deleting new Projects and the same for Documents.
While creating Documents, you also pass list of Elements reflecting the type and the order of elements in each Document.

## Design

<img src="https://i.postimg.cc/bNCWJK4j/Foleon.jpg" width="800" />

**Explanation**

**Projects table:** This table will store information about each project. Each project will have a unique ID, name, creation date, and any other relevant attributes. The ID will serve as the primary key for this table. 

**Documents table:** This table will store information about each document associated with a project. Each document will have a unique ID, name, creation and update date, and any other relevant attributes. 

**Elements table** This table will store information about each element associated with a document. Each element will have a unique ID, type (Button, Image or Text) and any other relevant attributes. 

**DocumentElements table:**
By using the DocumentElements table, we can represent the many-to-many relationship between documents and elements while also preserving the order of the elements within each document.

**Why is it scalable?**
With this structure, we can represent the relationships between projects, documents, and elements. Each project can have multiple documents, and each document can have multiple elements. The DocumentElements table stores the relationship between documents and elements, including the order of the elements within a document.
When fetching a document, we can join the Documents table with the DocumentElements table and the Elements table to retrieve all the elements for that document in the correct order.
This structure should be scalable and efficient, allowing you to easily add new projects, documents, and elements as needed, and to retrieve documents and their associated elements quickly and accurately.


## Installation

**PostgreSQL**
In order to run (other than docker),
you need to have an local DB by PostgreSQL with a table call foleonDB,
but don't worry, I prepare docker instance that will run it for you :)

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

For now I did unit test for project and documents services - so you it's better to run the scripts:

```bash
# unit tests
$ npm run test documents.service.spec.ts
$ npm run test projects.service.spec.ts --watch
```

