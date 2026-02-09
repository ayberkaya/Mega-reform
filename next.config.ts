import path from "node:path";
import type { NextConfig } from "next";

const projectRoot = path.resolve(process.cwd());
const tailwindPath = path.join(projectRoot, "node_modules/tailwindcss");

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      tailwindcss: tailwindPath,
    },
  },
  webpack: (config, { dir }) => {
    const root = dir ?? projectRoot;
    config.context = root;
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      tailwindcss: path.join(root, "node_modules/tailwindcss"),
    };
    return config;
  },
};

export default nextConfig;
