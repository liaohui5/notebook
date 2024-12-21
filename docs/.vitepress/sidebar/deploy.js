import { autoGenSidebars } from "../utils";

export default {
  "/deploy/cicd": autoGenSidebars("/deploy/cicd"),
  "/deploy/server/": autoGenSidebars("/deploy/server"),
  "/deploy/docker/": autoGenSidebars("/deploy/docker"),
  "/deploy/webpack/": autoGenSidebars("/deploy/webpack"),
  "/deploy/vite/": autoGenSidebars("/deploy/vite"),
  "/deploy/python/": autoGenSidebars("/deploy/python"),
};
