<p align="center">
 <img src="https://53.fs1.hubspotusercontent-na1.net/hubfs/53/Fergals/Foleon%20Logo.png" width="200" alt="foleon Logo" />
</p>

  <p align="center">Backend Assignment for Foleon </p>

## Description

In this project, I designed a service that is responsible for three entities: Projects, Documents, and Elements. This is a proof-of-concept project, and I implemented routes for creating, updating, and deleting new Projects and Documents. When creating Documents, you also pass a list of Elements that reflects the type and order of elements in each Document.

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
To run this application (other than in Docker), you need to have a local PostgreSQL database with a table called 'foleonDB'. But don't worry, I have prepared a Docker image that will run it for you :)

## Running the app
Run the following line and you all set to go!
```bash
$ docker-compose up
```

## Test

For now I did unit test for project and documents services - so you it's better to run the scripts:

```bash
# unit tests
$ npm run test documents.service.spec.ts
$ npm run test projects.service.spec.ts --watch
```

## Extra comment

Because it's a POC, when the app will start automatically 3 elements will create in the data base - button, image and text,
then you can go to swagger to test this api!!

go to:
```bash
$ http://localhost:3000/api
```

## What we can talk about?

There are numerous approaches to implementing this project, with various options for implementing each function, such as utilizing database calls, caching, and so on. I would be delighted to share my insights and engage in a discussion on how I could have enhanced the implementation to take it to the next level. Additionally, I would be pleased to explore any questions or solutions that I had considered.

## Hope you like it :)


