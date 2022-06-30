import '../public/css/app.css';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { QueryClientProvider } from 'react-query';
import {
  faBook,
  faPlus,
  faPlusSquare,
  faTimes,
  faSkullCrossbones,
  faGripLines,
  faTrashAlt,
  faTimesCircle,
  faSearch,
  faChevronRight,
  faCog,
  faEdit,
  faClone,
  faEye,
  faCopy,
  faHeart,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(faBook, faPlus, faPlusSquare, faTimes, faSkullCrossbones, faGripLines, faTrashAlt, faTimesCircle, faSearch, faChevronRight, faCopy, faCog, faEdit, faClone, faEye, faHeart, faShieldAlt);

initialize();

const client = require('../resources/js/lib/query-client').default;

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  mswDecorator,
  (story) => (
    <QueryClientProvider client={client}>
      {story()}
    </QueryClientProvider>
  ),
];
