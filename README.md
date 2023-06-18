# restaurants

## install dependencies

<p>The following command will install the dependencies:</p>
<p>You can change pnpm for npm</p>
<p>I developed this project with node 18.16 but you can try to run it in an older version (change engines in package.json)</p>

```
pnpm i
```

## run tests

<p>The following command will run the tests</p>

```
pnpm run test
```

### folders

<p>The code is structured following hexagonal architecture pattern with the following directories:</p>

<ul>
    <li>infrastructure: contains the implementation of the external dependencies from the application, in this part is easy to change json file to a database, the rest of the application will not be affected</li>
    <li>application: contains the core logic and business rules of the application, right in main.ts is an example but in the future this can change for a React app </li>
    <li>domain: represents the heart of the application. It encapsulates the business logic. Agnostic of the UI</li>
</ul>
