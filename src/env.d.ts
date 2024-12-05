/// <reference path="../.astro/types.d.ts" />
type KVNamespace = import("@cloudflare/workers-types").KVNamespace;
type ENV = {
  "worker-hidalgorealtor": KVNamespace;
};

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;
declare namespace App {
  interface Locals extends Runtime {}
}
