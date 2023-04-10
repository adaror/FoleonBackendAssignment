<p align="center">
 <img src="https://53.fs1.hubspotusercontent-na1.net/hubfs/53/Fergals/Foleon%20Logo.png" width="200" alt="foleon Logo" />
</p>

  <p align="center">Backend Assignment for Foleon </p>

## Description

In this project I designed a service responsible for 3 entities - Projects, documents and Elements.
This is a POC, In this project I implemented routes for creating, updated and deleting new Projects and the same for Documents.
While creating Documents, you also pass list of Elements reflecting the type and the order of elements in each Document.

## Design

<img src="https://i.postimg.cc/bNCWJK4j/Foleon.jpg" width="800">

** Explanation **
**Projects table:** This table will store information about each project. Each project will have a unique ID, name, creation date, and any other relevant attributes. The ID will serve as the primary key for this table. 

**Documents table:** This table will store information about each document associated with a project. Each document will have a unique ID, name, creation and update date, and any other relevant attributes. 

**Elements table** This table will store information about each element associated with a document. Each element will have a unique ID, type (Button, Image or Text) and any other relevant attributes. 

**DocumentElements table:**
By using the DocumentElements table, we can represent the many-to-many relationship between documents and elements while also preserving the order of the elements within each document.

## Installation

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

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
