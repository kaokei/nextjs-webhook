import axios from "axios";

export default async function handler(req, res) {
  try {
    const image = req.query.image || "";
    const result = await axios.get('https://cn.bing.com/hp/api/model')
    if (image) {
      const item0 = result.data.MediaContents[0];
      res.send(item0.ImageContent.Image.Url)
    } else {
      res.send(result.data)
    }
  } catch (e) {
    console.log("Get bing image error :>> ", e);
    res.send("Get bing image error");
  }
}
