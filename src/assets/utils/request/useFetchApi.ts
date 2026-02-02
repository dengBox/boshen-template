import { createFetch } from '@vueuse/core';
import { showToast } from '@nutui/nutui';

const useFetchApi = createFetch({
  baseUrl: '',
  options: {
    async beforeFetch({ options }) {
      const myToken = 'token';
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${myToken}`,
      };
      return { options };
    },
    afterFetch(ctx) {
      const { data, response } = ctx;
      if (response.status >= 200 && response.status < 300) {
        try {
          const jsonObj = data;
          if (jsonObj.code != 200) {
            showToast.fail(jsonObj.message || 'Error');
          }

          ctx.data = jsonObj.data;
        } catch (error) {
          console.error(error);
          ctx.data = null;
        }
      } else {
        showToast.fail(response.statusText || 'Error');
        ctx.data = null;
      }

      return ctx;
    },
  },
});

export default useFetchApi;
