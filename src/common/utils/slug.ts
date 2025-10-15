export default class SlugUtil {
  static getUrl(url: string, seoUrl: string, id: number) {
    if (seoUrl.length > 0) {
      url += `/${seoUrl || ''}`;
    } else {
      url += `/${id}`;
    }

    return url;
  }
}
