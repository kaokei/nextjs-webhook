const htmlStr = `
<h1>webhook 转发服务文档</h1>

<h2>页面地址</h2>

<p>https://webhook2.vercel.app/</p>

<h2>接口服务地址</h2>

<p>https://webhook2.vercel.app/api/dingding/sentry</p>

<h2>使用方式</h2>

<p>目前只实现了 sentry 的 webhook 转发到钉钉。</p>

<p>第一步，创建钉钉机器人，获取 webhook 链接，如下：</p>

<p>https://oapi.dingtalk.com/robot/send?access_token=1111122222223333334444445555566667777888899900011122233344455566</p>

<p>第二步，拼接参数到<code>https://webhook2.vercel.app/api/dingding/sentry</code>这个链接</p>

<p>目前支持 4 个参数：</p>

<ul><li><p>url：就是第一步中获取的钉钉原始的 webhook 链接，作为参数需要 encodeURIComponent(url)编码</p></li><li><p>mobile：需要@钉钉群中的人的手机号，可以不传</p></li><li><p>keyword：目前转发服务只支持关键词策略，默认是<code>监控报警</code>，可以不传</p></li><li><p>level：sentry 中的 level，默认是<code>all</code>，可以不传，用于过滤哪些 level 的需要转发，比如配置 level=error，则只会转发 error 级别的错误</p></li></ul>

<p>参考示例如下：</p>

<p>https://webhook2.vercel.app/api/dingding/sentry?url=https%3A%2F%2Foapi.dingtalk.com%2Frobot%2Fsend%3Faccess_token%3D1111122222223333334444445555566667777888899900011122233344455566&amp;mobile=13911112222&amp;keyword=监控报警&amp;level=info&amp;level=error</p>

<h2>部署到 vercel.app</h2>

<p>有需要的话，可以直接使用我的 git 仓库在 https://vercel.com/ 上部署自己的服务</p>
`;

export default function Home() {
  return (
    <div className="container">
      <main>
        <div dangerouslySetInnerHTML={{ __html: htmlStr }}></div>
      </main>
    </div>
  );
}
