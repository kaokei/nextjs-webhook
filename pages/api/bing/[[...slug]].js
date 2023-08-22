import axios from "axios";

export default async function handler(req, res) {
  try {
    const image = req.query.image || "";
    const result = await axios.get('https://cn.bing.com/hp/api/model');
    if (image) {
      let url = result.data.MediaContents[0];
      if(url.indexOf('http') !== 0) {
        url = 'https://cn.bing.com' + url;
      }
      res.redirect(302, url);
    } else {
      res.send(result.data);
    }
  } catch (e) {
    console.log("Get bing image error :>> ", e);
    res.send("Get bing image error");
  }
}
