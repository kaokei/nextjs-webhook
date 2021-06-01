import axios from "axios";

export default async function handler(req, res) {
  try {
    var data = req.body || {};
    var mobile = req.query.mobile || "";
    var keyword = req.query.keyword || "监控报警";
    var level = req.query.level;
    if (level) {
      if (level === "all") {
        level = "";
      } else {
        if (typeof level === "string") {
          level = [level];
        }
      }

      if (!(level && level.includes(data.level))) {
        // 不是想要的level
        return res.send("webhook forward filtered");
      }
    }

    var httpdata = data.event && data.event["sentry.interfaces.Http"];
    var httpLink = "";

    var tags = data.event && data.event.tags;
    var tagsString = "";
    if (tags) {
      tagsString = tags
        .map((tag) => `- ${tag[0] || ""} => ${tag[1] || ""}`)
        .join("\n");
    }

    if (httpdata) {
      httpLink = `${httpdata.url}?${httpdata.query_string || ""}`;
    }

    var markdownText = `# [${keyword} : ${data.message || "错误信息"}](${
      data.url
    })\n> ${data.project_name}  \n> [${
      data.culprit || "错误页面"
    }](${httpLink})  \n${tagsString}  \n  @${mobile}  \n`;

    await axios.post(req.query.url, {
      msgtype: "markdown",
      markdown: {
        title: data.message,
        content: markdownText,
        mentioned_list: ["@all"]
      },
      at: {
        atMobiles: [mobile],
        isAtAll: false,
      },
    });
    res.send("webhook forward success");
  } catch (e) {
    console.log("dingding sentry axios post error :>> ", e);
    res.send("webhook forward failed");
  }
}
