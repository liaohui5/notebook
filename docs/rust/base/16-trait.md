## 什么是 trait

中文直译就是: `特性` 或者 `特征`

可以简单的理解为其他编程语言中接口(interface)的功能,
就是为了定义共同行为

比如: 之前学习泛型的时候用过 [std::cmp::PartialOrd](https://rustwiki.org/zh-CN/core/cmp/trait.PartialOrd.html) 它就是内置的 trait

## 定义 trait

```rust
// 多边形
trait Polygon {
    // 获取面积
    fn get_area(&self) -> u32;

    // 获取周长
    fn get_length(&self) -> u32;
}

// 矩形
struct Rectangle {
    width: u32,
    height: u32,
}

impl Polygon for Rectangle {
    fn get_area(&self) -> u32 {
        self.width * self.height
    }

    fn get_length(&self) -> u32 {
        self.height * 2 + self.width * 2
    }
}

// 正方形
struct Square {
    width: u32,
}

impl Polygon for Square {
    fn get_area(&self) -> u32 {
        self.width * self.width
    }

    fn get_length(&self) -> u32 {
        self.width * 4
    }
}

// 三角形(等边)
struct Triangle {
    length: u32,
}

impl Polygon for Triangle {
    fn get_area(&self) -> u32 {
        self.length * 3 / 2
    }

    fn get_length(&self) -> u32 {
        self.length * 3
    }
}

// 传入的数据类型必须实现 Polygon 这个特性
// 这就是面向对象语言中 多态 的概念
// 正方形/长方形/三角形 计算面积可以看做 多边形计算面积
// 正方形/长方形/三角形 计算周长可以看做 多边形计算边长
fn get_poly_info<T: Polygon>(polygon: &T) -> (u32, u32) {
    let area = polygon.get_area();
    let length = polygon.get_length();
    (area, length)
}

fn main() {
    let rect = Rectangle {
        width: 3,
        height: 4,
    };
    let (area, length) = get_poly_info(&rect);
    println!("rect area={}, length={}", area, length);

    let square = Square {
        width: 3,
    };
    let (area, length) = get_poly_info(&square);
    println!("square area={}, length={}", area, length);

    let tria = Triangle {
        length: 4,
    };
    let (area, length) = get_poly_info(&tria);
    println!("tria area={}, length={}", area, length);
}
```

## 默认实现

trait 可以有默认实现, 不同于Java的接口, 接口只能定义方法, 不能有默认实现

```rust
trait Animal {
    fn eat(&self);
    fn breath(&self) {
        println!("动物都需要呼");
    }
}

struct Cat {}

impl Animal for Cat {
    // 使用默认实现的 breath
    // fn breath(&self) {
    //     println!("猫需要呼吸");
    // }
    fn eat(&self) {
        println!("猫吃鱼");
    }
}

struct Dog {}

impl Animal for Dog {
    fn breath(&self) {
        println!("狗需要呼吸");
    }

    fn eat(&self) {
        println!("狗吃骨头");
    }
}

fn animal_eat_breath<T: Animal>(animal: &T) {
    animal.breath();
    animal.eat();
}

fn main() {
    let cat = Cat {};
    animal_eat_breath(&cat);

    let dog = Dog {};
    animal_eat_breath(&dog);
}
```

## trait 当作参数

### 多种绑定方式

```rust
trait Runable {
    fn run(&self) {
        println!("运行中...");
    }
}

// 两种写法原理是一样的, 后面这种事新版本的语法糖
fn is_runable<T: Runable>(t: T) {
    t.run();
}

fn is_executable(t: &impl Runable) {
    t.run();
}
```

### 使用 + 指定多个 trait 绑定

```rust
trait Writable {
    fn write(&self) {
        println!("是否可写...");
    }
}

trait Configurable {
    fn config(&self) {
        println!("是否可配置...");
    }
}

fn is_writeable(t: &(impl Writeable + Configurable)) {

}

// 推荐: 比较清晰
fn is_configurable<T: Writable + Configurable>(t: &T) {

}
```

### 通过 where 简化 trait 绑定

```rust
trait Readable {
    fn read(&self) {
        println!("是否可读...");
    }
}

trait Writable {
    fn write(&self) {
        println!("是否可写...");
    }
}

trait Runable {
    fn run(&self) {
        println!("是否可执行...");
    }
}

// 如果特性比较多, 那么这么写就比较变态, 建议使用 where 关键字
// fn is_full_perms<T: Readable + Writable, U:Readable + Writable + Runable>
// (path: T, file: U) -> bool
// {
//     false
// }

fn is_full_rights<T, U>(path: T, file: U) -> bool
where
    T: Readable + Writable,
    U: Readable + Writable + Runable
{
    true
}
```

## trait 类型当作返回值

```rust
trait Swimable {
    fn swim(&self);
}

struct Fish {}
impl Swimable for Fish {
    fn swim(&self) {
        println!("鱼会游泳");
    }
}

struct Tortoise {}
impl Swimable for Tortoise { 
    fn swim(&self) {
        println!("乌龟会游泳");
    }
}

fn get_swimable_animal()-> impl Swimable {
    Fish{ }
    // Tortoise{ }
}

fn main() {
    let swimable_animal = get_swimable_animal();
    swimable_animal.swim();
}
```

## 标准库 trait 学习

### Eq 和 PartialEq

### Ord 和 PartialOrd

### Clone 和 Copy

