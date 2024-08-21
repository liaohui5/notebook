## 文档

- [json 模块](https://docs.python.org/zh-cn/3/library/json.html#module-json)

## JSON 字符串转 python 字典

```python
import json

user_info='{"id":1001, "name": "tom", "email": "tom@example.com"}'

user = json.loads(user_info)

for key in user.keys():
    val = user[key]
    print(f"key={key} val={val} type={type(val)}")

# key=id    val=1001            type=<class 'int'>
# key=name  val=tom             type=<class 'str'>
# key=email val=tom@example.com type=<class 'str'>
```

## python 字典转 JSON 字符串

```python
import json

user = {
    "id": 1001,
    "name": "tom",
    "email": "tom@example.com"
}
user_info = json.dumps(user)

print("user_info:", user_info)
print("data_type:", type(user_info))

# user_info: {"id": 1001, "name": "tom", "email": "tom@example.com"}
# data_type: <class 'str'>
```
