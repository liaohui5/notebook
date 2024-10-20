import { autoGenSidebars } from '../utils/gen-sidebar';

export default {
  '/clang/': autoGenSidebars('/clang'),
  '/rust/base/': autoGenSidebars('/rust/base'),
  '/rust/async/': autoGenSidebars('/rust/async'),
};
