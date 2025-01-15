## 基本使用

```jsx
import React, { useState } from "react";

const App = () => {
  // 同一个函数式组件中, 可以多次使用 useState 这个 hook
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  return (
    <div>
      <div>
        <p>count: {count}</p>
        <button onClick={() => setCount(count + 1)}>增加</button>
        <button onClick={() => setCount(count - 1)}>减少</button>
      </div>
    </div>
  );
};

export default App;
```

## hooks 设置 state 的方法是否是异步?

这个设置 state 的方法本质上是用的 setState 来实现的, 所以和 [setState 特性](/react/base/1-jsx语法.html#setstate-是同步还是异步)一致
