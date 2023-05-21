# 我的 AI API

负载均衡OpenAI或第三方AI接口

## 关于程序结构

分为配置层、入口、出口

一个出口一个API类别，里面每个key的权重都一样，比如都是5刀测试号等，都是某个第三方平台的号

## 配置文件

1

## 关于错误码

### 初步实现

遇到 [Error codes](https://platform.openai.com/docs/guides/error-codes/error-codes) 自动切换下一个key。（当前实现为随机下一个，且存在BUG `TypeError: This ReadableStream is disturbed (has already been read from), and cannot be used as a body`）

### 后续实现

不同错误码不同处理方式，永久不启用、暂时不用等

## 负载均衡策略
