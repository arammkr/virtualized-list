import HttpException from 'exceptions/HttpException';

const { REACT_APP_API_HOST, REACT_APP_BASE_API_URL } = process.env;

export default class Fetch {
  static async fetch(options) {
    const {
      url = `${REACT_APP_API_HOST}${REACT_APP_BASE_API_URL}`,
      headers,
      method,
      body,
      path = '',
      urlParams,
    } = options;

    const requestOptions = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      method,
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    // Get params
    const queryStr = urlParams
      ? `?${Object.keys(urlParams)
          .map(
            k => `${encodeURIComponent(k)}=${Array.isArray(k) ? k.join(',') : encodeURIComponent(urlParams[k])}`,
          )
          .join('&')}`
      : '';

    // Fire the Request and Return the response promise Object
    const requestPromise = await fetch(
      new Request(`${url}${path}${queryStr}`, requestOptions),
    );

    if (requestPromise) {
      const text = await requestPromise.text();
      const parsed = text ? JSON.parse(text) : body;

      if (parsed && parsed.success) {
        return parsed.payload;
      }

      throw new HttpException(
        parsed.message,
        parsed.status || requestPromise.status,
        parsed.payload,
      );
    } else {
      throw new Error(requestPromise.statusText);
    }
  }

  /* GET (retrieve) */
  static get = options => Fetch.fetch({ ...options, method: 'GET' });

  /* POST (create) */
  static post = options => Fetch.fetch({ ...options, method: 'POST' });

  /* PUT (update) */
  static put = options => Fetch.fetch({ ...options, method: 'PUT' });

  /* PATCH (update) */
  static patch = options => Fetch.fetch({ ...options, method: 'PATCH' });

  /* DELETE (remove) */
  static delete = options => Fetch.fetch({ ...options, method: 'DELETE' });
}
