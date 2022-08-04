import { QueryClientProvider } from 'react-query';

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ReactQueryDevtools } from 'react-query/devtools';
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
  faChevronLeft,
  faCog,
  faEdit,
  faClone,
  faEye,
  faCopy,
  faHeart,
  faShieldAlt,
  faCheck,
  faSort,
} from '@fortawesome/free-solid-svg-icons';

import { enableMapSet } from 'immer';

require('./bootstrap');

enableMapSet();

library.add(faBook, faPlus, faPlusSquare, faTimes, faSkullCrossbones, faGripLines, faTrashAlt, faTimesCircle, faSearch, faChevronRight, faChevronLeft, faCopy, faCog, faEdit, faClone, faEye, faHeart, faShieldAlt, faCheck, faSort);

const client = require('./lib/query-client').default;

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  resolve: name => require(`./Pages/${name}`),
  setup({
    el,
    App,
    props,
  }) {
    render(
      <QueryClientProvider client={client}>
        <App {...props} />
        <ReactQueryDevtools/>
      </QueryClientProvider>,
      el,
    );
  },
});

InertiaProgress.init({ color: '#4B5563' });
