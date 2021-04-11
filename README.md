# webhook 转发服务文档

## 页面地址

https://webhook2.vercel.app/

## 接口服务地址

https://webhook2.vercel.app/api/dingding/sentry

## 使用方式

目前只实现了 sentry 的 webhook 转发到钉钉。

第一步，创建钉钉机器人，获取 webhook 链接，如下：

https://oapi.dingtalk.com/robot/send?access_token=1111122222223333334444445555566667777888899900011122233344455566

第二步，拼接参数到`https://webhook2.vercel.app/api/dingding/sentry`这个链接

目前支持 4 个参数：

- url：就是第一步中获取的钉钉原始的 webhook 链接，作为参数需要 encodeURIComponent(url)编码

- mobile：需要@钉钉群中的人的手机号，可以不传

- keyword：目前转发服务只支持关键词策略，默认是`监控报警`，可以不传

- level：sentry 中的 level，默认是`all`，可以不传，用于过滤哪些 level 的需要转发，比如配置 level=error，则只会转发 error 级别的错误

参考示例如下：

https://webhook2.vercel.app/api/dingding/sentry?url=https%3A%2F%2Foapi.dingtalk.com%2Frobot%2Fsend%3Faccess_token%3D1111122222223333334444445555566667777888899900011122233344455566&mobile=13911112222&keyword=监控报警&level=info&level=error

## 部署到 vercel.app

有需要的话，可以直接使用我的 git 仓库在 https://vercel.com/ 上部署自己的服务
