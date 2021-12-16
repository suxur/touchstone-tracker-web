import { QueryClientProvider } from 'react-query';

require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { library } from '@fortawesome/fontawesome-svg-core';
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
  faCopy
} from '@fortawesome/free-solid-svg-icons';

library.add(faBook, faPlus, faPlusSquare, faTimes, faSkullCrossbones, faGripLines, faTrashAlt, faTimesCircle, faSearch, faChevronRight, faCopy, faCog, faEdit, faClone, faEye);

const client = require('./lib/query-client').default;

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  resolve: name => require(`./Pages/${name}`),
  setup({
          el,
          App,
          props
        }) {
    render(
      <QueryClientProvider client={client}>
        <App {...props} />
      </QueryClientProvider>
      , el);
  },
});

InertiaProgress.init({ color: '#4B5563' });
