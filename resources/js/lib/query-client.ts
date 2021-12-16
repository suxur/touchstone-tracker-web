import { QueryClient, QueryKey } from 'react-query';
import axios from 'axios';

interface DefaultQueryProps {
  queryKey: QueryKey;
}

const defaultQueryFn = async ({ queryKey }: DefaultQueryProps) => {
  const { data } = await axios.get(
    `http://localhost/api/${queryKey[0]}`
  );
  return data;
};

const client = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn
    }
  }
});


export default client;
