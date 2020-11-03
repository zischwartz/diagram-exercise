# Diagram UI Exercise

### About

Given the time constraints, I opted to use the [reactflow](https://reactflow.dev) library for the diagram display, which provides a lot of the basic display logic for flow charts, while being very extensible and expandable.

### Running Locally for Development

Clone down this repo and run

```bash
yarn && yarn start
```

To install all the dependencies and start up the dev server.

### Limitations & Caveats

- The way the `onChange` handler is attached to each element's `data` property is awkward, and would be worth refactoring.
- Because I ended up using `reactflow`, which contains it's own tests, and the time constraints, I did not write tests. Had I been able to, the `propagateDown` function would be high on the list.
