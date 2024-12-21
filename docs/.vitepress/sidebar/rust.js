import { autoGenSidebars } from "../utils";

export default {
  "/clang/": autoGenSidebars("/clang"),
  "/rust/base/": autoGenSidebars("/rust/base"),
  "/rust/libs/": autoGenSidebars("/rust/libs"),
  "/rust/async/": autoGenSidebars("/rust/async"),
};
