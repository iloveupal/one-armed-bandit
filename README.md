# one-armed-bandit

Use these scripts to work with the application.

*Install dependencies*

```
yarn
```

*Run*

```
yarn start
```

*Build*

```
yarn build
```

*Test*

```
yarn test
```

## **Some Considerations**

1. No redux store — the logic isn't complicated enough and there's no need to keep different parts of the app in sync. However, the redux store could have helped us avoid some up and down data movement.

2. The times for the wheels are chosen randomly and separatedly. If we choose the time of 50ms for the each wheel, the result is rather predictable.
