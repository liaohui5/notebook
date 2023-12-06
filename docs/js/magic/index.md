## 自增id

::: code-group

```js [js]
let __id = 0;
const $id = () => ++__id;
```

```ts [ts]
let __id: number = 0;
const $id = (): number => ++__id;
```
:::
