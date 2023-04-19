import axios from "axios";

export default async function handler(req, res) {
  try {
    await axios.post(req.query.url, getData(req));
    res.send("webhook forward success");
  } catch (e) {
    console.log("dingding sentry axios post error :>> ", e);
    res.send("webhook forward failed");
  }
}

function getData(req) {
  var data = req.body || {};
  var keyword = req.query.keyword || "监控报警";

  let str = '';
  if(data && data.text) {
    str = data.text;
  } else {
    str = JSON.stringify(data);
  }

  const res = { msg_type: "text", content: { text: keyword + "\n" + str } };

  return res;
}
