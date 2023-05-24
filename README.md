# 我的 AI API

负载均衡OpenAI或第三方AI接口。

## 负载均衡策略

当前实现为每次请求随机抽取出口key

## 关于程序结构

### 入口

入口需传入key，值为本程序inbounds中的配置，传入格式与openai一直。

### 出口

一个出口一个API类别，其每个key的权重都一样，比如都是5刀测试号等。

## 配置文件

目前未实现读取配置文件

## 关于错误码（当前未处理）

### 预计实现

遇到 [Error codes](https://platform.openai.com/docs/guides/error-codes/error-codes) 自动切换下一个key。

### 后续实现

不同错误码不同处理方式，永久不启用、暂时不用等
