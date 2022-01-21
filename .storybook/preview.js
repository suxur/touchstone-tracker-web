import '../public/css/app.css';
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
  faCopy,
  faHeart,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(faBook, faPlus, faPlusSquare, faTimes, faSkullCrossbones, faGripLines, faTrashAlt, faTimesCircle, faSearch, faChevronRight, faCopy, faCog, faEdit, faClone, faEye, faHeart, faShieldAlt);


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
