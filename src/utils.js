import api, { route } from "@forge/api";

class Utils {

  getConfluenceBody = async (id) => {
    let response = await api.asUser().requestConfluence(route`/wiki/rest/api/content/${id}?expand=body.dynamic`);

    let pageBody = await response.json();

    console.log(pageBody)
    return pageBody;

  };
}

export default Utils;
