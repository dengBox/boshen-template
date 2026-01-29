import { defineComponent, ref, watch } from 'vue';
import { encryptTicket } from '@/api/index';
import type { HttpHeader } from '@/interface';
import { useGlobalStore } from '@/store';

const signedSrc = ref('');
const globalState = useGlobalStore().globalState;

export default defineComponent(
  (props) => {
    const headers: HttpHeader = {
      tenantCode: globalState.tenantCode,
      sceneCode: globalState.sceneCode,
      serviceCode: globalState.serviceCode,
      businessEntityCode: globalState.businessEntityCode,
    };

    const genetatorParams = (ticket: any) => {
      const params = {
        ticket,
        reportId: props.reportId,
        ...headers,
      };
      const paramStr = new URLSearchParams(params);
      return `${import.meta.env.VITE_API_BI_URL}/#/report/preview?${paramStr.toString()}`;
    };

    const getTicketByReportId = async () => {
      try {
        const res = await encryptTicket();
        signedSrc.value = genetatorParams(res);
        return signedSrc.value;
      } catch (err) {
        console.error('秘钥解析失败！', err);
        return '';
      }
    };

    watch(
      () => props.reportId,
      (newVal, oldVal) => {
        if (!newVal || newVal === oldVal) return;
        getTicketByReportId();
      },
      { immediate: true },
    );

    return () => {
      return <iframe style="width: 100%; height: 100%; border: none;" key={props.reportId} src={signedSrc.value} />;
    };
  },
  {
    props: {
      reportId: {
        required: true,
        type: String,
      },
    },
  },
);
