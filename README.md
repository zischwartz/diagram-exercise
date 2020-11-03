# [Diagram UI Exercise](https://zischwartz.github.io/diagram-exercise/)

![screenshot](https://user-images.githubusercontent.com/77472/98008414-80ff2d80-1dc2-11eb-86af-d9a1725412df.png)

### About

Given the time constraints, I opted to use the [reactflow](https://reactflow.dev) library which provides a lot of the basic display logic for flow charts, while being very extensible and expandable.

I also used `jsdoc` to include some lightweight documentation directly in the code, which is available as an [html page here](https://zischwartz.github.io/diagram-exercise/docs/global.html).

### Development & Deployment

To install and run locally, clone down this repo and from this directory run:

```bash
yarn && yarn start
```

This will install all the dependencies and start up the dev server.

To build the project, the docs, and to deploy both via github pages, run:

```bash
yarn ship
```

### Limitations & Caveats

- The way the `onChange` handler is attached to each element's `data` property is awkward, and would be worth refactoring.
- Because I ended up using `reactflow`, which contains it's own tests, and the time constraints, I did not write tests. Had I been able to, the `propagateDown` function would be high on the list.
- It doesn't deal with specific logic around which types of nodes can connect to which other types, currently any type is allowed to connect to any other type.
- There's no mechanism or UI to _clear_ localStorage currently.
