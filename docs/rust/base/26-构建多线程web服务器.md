## 实现一个监听请求的web服务器

能够直接用浏览器访问, 然后真确的响应数据

- 学习一些 TCP 与 HTTP 知识
- 在套接字(socket)上监听 TCP 请求
- 解析少量的 HTTP 请求
- 创建一个合适的 HTTP 响应
- 通过线程池改善 server 的吞吐量

## 创建项目

```sh
cargo new rust-web-server
cargo install cargo-watch # 方便单元测试查看效果
```

## 目录结构

```txt
.
├── Cargo.lock
├── Cargo.toml
├── public
│   ├── 404.html       # NotFound 页面
│   ├── index.html     # 首页
│   ├── sleep.html     # 测试多线程页面
│   └── test.html      # 测试根据请求地址自动读取对应文件页面
└── src
    ├── config.rs      # 命令行参数配置模块
    ├── http_server.rs # HTTP服务器模块
    ├── lib.rs         # 模块
    ├── main.rs        # 程序入口
    └── thread_pool.rs # 线程池模块
```

## 具体实现

我和书上写的稍微有点不一样, 但是主要的逻辑是一样的

### 静态页面文件

::: code-group

```html [public/404.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rust Web Server</title>
  </head>
  <body>
    <h2>page not found, back <a href="/">home</a> page</h2>
  </body>
</html>
```

```html [public/index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rust Web Server</title>
  </head>
  <body>
    <h2>hello rust web server</h2>
  </body>
</html>
```

```html [public/sleep.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rust Web Server</title>
  </head>
  <body>
    <h2>request with long process time</h2>
  </body>
</html>
```

```html [public/test.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rust Web Server</title>
  </head>
  <body>
    <h2>Automatically respond to file content based on request path</h2>
  </body>
</html>
```

:::

### src/main.rs

```rust
use rust_http_server::*;
use std::process;
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::new(&args).unwrap_or_else(|err|{
        eprintln!("Failed to parse arguments: {}", err);
        process::exit(1);
    });

    http_server::listen(config).unwrap_or_else(|e| {
        eprintln!("{}", e);
        process::exit(0);
    });
}

```

### src/lib.rs

```rust
pub mod config;
pub mod http_server;
pub mod thread_pool;
pub use config::Config;
```

### src/config.rs

处理命令行参数

```rust
use std::num::ParseIntError;

pub struct Config {
    pub port: u16,
    pub path: String,
}

impl Config {
    pub fn new(args: &[String]) -> Result<Config, ParseIntError> {
        let mut config = Config {
            port: 8080,
            path: String::from("./public"),
        };

        if args.len() >= 2 {
            for item in args.iter() {
                // --port
                if item == "--port" {
                    config.port = item.clone().parse()?;
                }

                // --dir or --path or --public-dir or --public-path
                if item == "--dir" || item == "--path" || item == "--public-dir" || item == "--public-path" {
                    config.path = item.to_string();
                }
            }
        }

        Ok(config)
    }
}
```

### src/thread_pool

线程池模块: 为web服务器提供多线程支持

```rust
use std::thread;
use std::sync::{mpsc, Arc, Mutex};

// Job 是一个闭包, 但闭包是动态大小的类型 DST -> ?Sized
// 所以需要一个 Box 智能指针来包裹, 之后直接通过函数指针来调用
type Job = Box<dyn FnOnce() + Send + 'static>;

// 用枚举来区分, 发送的消息是一个发送新任务还是要终止线程
#[allow(unused)]
pub enum TaskMessage {
    NewTask(Job),
    Exit
}

// 实际执行任务的对象,用 id 来标记 thread, 就可以很方便的区分不同的线程
#[allow(unused)]
pub struct Worker {
    id: usize,
    thread: Option<thread::JoinHandle<()>>,
}
impl Worker {
    pub fn new(id:usize, receiver: Arc<Mutex<mpsc::Receiver<TaskMessage>>>) -> Worker {
        // 实例化 worker 需要传入 id 和 多线程引用计数指针
        // 指向一个 被互斥锁保护的 信道接收器对象
        // 信道对象接收 Job 类型的数据
        let thread = thread::spawn(move || {
            loop {
                // 由于 recv 只会接收一次, 所以要用循环一直不停的接收(阻塞线程)
                // 看是否有任务被发送过来, 如果有任务发送过来就需要处理
                let message = receiver.lock().unwrap().recv().unwrap();

                // 接收到任务消息过来之后还需要判断
                // 是新任务就执行,是终止消息就终止线程
                match message {
                    TaskMessage::NewTask(job) => {
                        println!("worker-{}-execute-task.", id);
                        job();
                    },
                    TaskMessage::Exit => {
                        // 终止线程: 停止接收信道对象发送的任务消息
                        // 退出 loop 循环, 那么这个线程自然就执行完了
                        println!("worker-{}-exit.", id);
                        break;
                    }
                }
            }
        });

        let thread = Some(thread);

        Worker { id, thread }
    }
}

// 线程池
// workers: 实际执行任务的线程(id+thread)
// sender:  信道对象的发送者
#[allow(unused)]
pub struct ThreadPool {
    workers: Vec<Worker>,
    sender: mpsc::Sender<TaskMessage>,
}
impl ThreadPool {
    pub fn new(thread_count: usize) -> ThreadPool {
        assert!(thread_count > 0);
        let mut workers = Vec::with_capacity(thread_count);

        // 初始化信道
        let (sender, receiver) = mpsc::channel();

        // 由于是多线程, 为了避免数据竞争的问题, 所以需要互斥器锁来保护数据
        // 由于是多线程, 所以需要多所有权(否则只有第一个线程能获得所有权)
        let receiver = Arc::new(Mutex::new(receiver));

        // 初始化 worker 并保存, 注意传入需要引用计数智能指针
        // 让 worker 中的线程 闭包 获得所有权
        for id in 0..thread_count {
            workers.push(Worker::new(id, Arc::clone(&receiver)));
        }

        ThreadPool { workers, sender }
    }

    pub fn execute<F>(&self, f: F)
        // 为什么这样定义泛型? 因为 f 是一个跨线程传输的闭包
        // 或者说闭包类型的数据就是应该这样定义泛型约束:
        // FnOnce:  必须传入闭包
        // Send:    可以跨线程传输的类型
        // 'static: 让传入的闭包在程序运行期间都存活
        where F: FnOnce() + Send + 'static
    {
        let job = Box::new(f);
        self.sender.send(TaskMessage::NewTask(job)).unwrap();
    }
}

// 优雅的停止服务器(停止主线程之前先关闭所有子线程)
// 如果直接 Ctrl-C 直接强行终止主线程, 那么子线程就算没有执行完也会退出
// 为 ThreadPool 实现 Drop 特性, 在主线程结束时, 会自动调用 drop 方法
// 所以可以在 drop 方法中先停止所有的子线程
impl Drop for ThreadPool {
    fn drop(&mut self) {
        for worker in &mut self.workers {
            println!("Shutting down worker {}", worker.id);

            if let Some(thread) = worker.thread.take() {
                thread.join().unwrap();
            }
        }
    }
}
```

### src/http_server.rs

监听TCP链接, 解析请求, 处理响应数据

```rust
use std::str::FromStr;
use std::time::Duration;
use std::{ fs, thread };
use std::io::{ Read, Write, Result as IOResult };
use std::net::{ Ipv4Addr, SocketAddr, SocketAddrV4, TcpListener, TcpStream };
use std::sync::Arc;

use crate::thread_pool::ThreadPool;
use crate::config::Config;

pub fn listen(config: Config) -> IOResult<()> {
    let addr = SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), config.port));
    let pool = ThreadPool::new(5);

    // config 只读的, 没有数据竞争问题, 所以不用互斥锁保护数据
    let config = Arc::new(config);

    print!("\x1b[1m\x1b[31m"); // 输出红色的调试信息
    println!("server started on http://{}", addr);
    print!("\x1b[22m\x1b[39m"); // 输出红色的调试信息

    // TcpListener::bind 会阻塞主线程
    let listener = TcpListener::bind(addr)?;
    for stream in listener.incoming() {
        let stream = stream.unwrap();
        let config_arc = Arc::clone(&config);

        // 使用线程池处理请求
        pool.execute(move || {
            handle_request(stream, config_arc);
        });
    }

    Ok(())
}

fn handle_request(mut stream: TcpStream, config: Arc<Config>) {
    // 注意 buffer 是一个 u8 数组 [u8; 1024], 不是一个 Vec<u8>
    let mut buffer = [0; 1024];
    Read::read(&mut stream, &mut buffer).unwrap();

    let http_req_str = String::from_utf8(buffer.to_vec()).unwrap();

    // 请求字符串
    // println!("{:?}", http_req_str);

    print!("\x1b[1m\x1b[31m"); // 输出红色的调试信息
    let (status_line, file_path) = get_response(&http_req_str, config);
    let contents = fs::read_to_string(file_path).unwrap();
    let response = format!(
        "{}\r\nContent-Length: {}\r\n\r\n{}",
        status_line,
        contents.len(),
        contents
    );

    // 响应字符串
    // println!("{:?}", response);

    print!("\x1b[22m\x1b[39m"); // 输出红色的调试信息
    Write::write_all(&mut stream, response.as_bytes()).unwrap();
    stream.flush().unwrap();
}

fn get_response(http_req_str: &str, config: Arc<Config>) -> (String, String) {
    let public_path = config.path.to_string();

    // 解析请求的方法,路径,http协议版本等信息
    let (method, req_path, protocol_version) = parse_http_info(http_req_str);
    println!("request-info:method={method} req_path={req_path} http_ver={protocol_version}");

    // 处理一些特殊的请求路径
    let route_path = if req_path == "/" { // 映射首页文件
        "/index.html"
    } else if req_path == "/sleep.html" { // 测试多线程
        thread::sleep(Duration::from_secs(5));
        req_path
    } else { // 其他情况
        req_path
    };

    // 客户端请求的文件路径, 需要加上 public_path
    let mut req_file_path = public_path.clone();
    req_file_path.push_str(route_path);

    // 响应 header 信息: HTTP/1.1 200 OK\r\nxxx
    let mut status_line = String::from_str(protocol_version).unwrap();
    let mut res_file_path = req_file_path;

    // 由于这是个简单的静态文件服务器,所以:
    // 不是 GET 请求或者文件不存在都应该返回 404
    if method != "GET" || fs::metadata(res_file_path.as_str()).is_err(){
        let mut _404_file_path = public_path.clone();
        _404_file_path.push_str("/404.html");

        // HTTP/1.1 404 NOT FOUND
        status_line.push_str(" 404 NOT FOUND");
        res_file_path = _404_file_path;
    } else {
        status_line.push_str(" 200 OK");
    }

    (status_line, res_file_path)
}

fn parse_http_info(http_req_str: &str) -> (&str, &str, &str) {
    // print!("\x1b[1m \x1b[31m");
    let http_info = http_req_str.lines().next().unwrap();
    let methods = ["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"];

    // parse request method
    let mut http_method = "GET";
    for item in methods.iter() {
        if let Some(_index) = http_info.find(item) {
            http_method = item;
        }
    }

    // parse protocol version
    let mut http_version = "HTTP/1.1";
    if let Some(start_index) = http_info.rfind("HTTP/") {
        http_version = &http_info[start_index..http_info.len()];
    }

    // parse request path
    let req_path_start = http_method.len() + 1;
    let req_path_end = http_info.len() - http_version.len() - 1;
    let req_path = &http_info[req_path_start..req_path_end];

    // print!("\x1b[22m \x1b[39m");
    (http_method, req_path, http_version)
}


#[cfg(test)]
mod unit_tests {
    use super::*;

    #[test]
    fn should_be_parse_http_method() {
        let http_req_str = String::from("GET / HTTP/1.1\r\n");
        let (http_method, _, _) = parse_http_info(&http_req_str);
        assert_eq!(http_method, "GET");

        let http_req_str = String::from("POST / HTTP/1.1\r\n");
        let (http_method, _, _) = parse_http_info(&http_req_str);
        assert_eq!(http_method, "POST");

        let http_req_str = String::from("DELETE / HTTP/1.1\r\n");
        let (http_method, _, _) = parse_http_info(&http_req_str);
        assert_eq!(http_method, "DELETE");
    }

    #[test]
    fn should_be_parse_http_version() {
        let http_req_str = String::from("GET / HTTP/1.1\r\n");
        let (_, _, http_version) = parse_http_info(&http_req_str);
        assert_eq!(http_version, "HTTP/1.1");

        let http_req_str = String::from("POST / HTTP/2\r\n");
        let (_, _, http_version) = parse_http_info(&http_req_str);
        assert_eq!(http_version, "HTTP/2");

        let http_req_str = String::from("POST / HTTP/2.0\r\n");
        let (_, _, http_version) = parse_http_info(&http_req_str);
        assert_eq!(http_version, "HTTP/2.0");
    }


    #[test]
    fn should_be_parse_request_path() {
        let http_req_str = String::from("GET / HTTP/1.1\r\n");
        let (_, request_path, _) = parse_http_info(&http_req_str);
        assert_eq!(request_path, "/");

        let http_req_str = String::from("GET /test.html HTTP/1.1\r\n");
        let (_, request_path, _) = parse_http_info(&http_req_str);
        assert_eq!(request_path, "/test.html");
    }
}

```
