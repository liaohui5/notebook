## 内部可变性(internal mutability)

内部可变性允许你用只读引用去修改数据, 这违背了借用规则(内部使用了 unsafe 来绕过借用检查器)

RefCell 可以在运行时进行借用检查规则

