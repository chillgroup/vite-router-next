import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('@chillgroup/vite-router-next/package.json')

export default defineConfig({
  lang: 'en-US',
  title: 'Vite Router Next',
  description: 'File system based routing for React using Vite',
  base: '/vite-router-next/',
  themeConfig: {
    nav: nav(),
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/chillgroup/vite-router-next',
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Chill Group',
    },
    sidebar: {
      '/guide/': sidebarGuide(),
    },
  },
})

function nav() {
  return [
    {
      text: 'Guide',
      link: '/guide/what-is-vite-router-next',
      activeMatch: '/guide/',
    },
    {
      text: pkg.version,
      items: [
        {
          text: 'Releases Changelog',
          link: 'https://github.com/chillgroup/vite-router-next/releases',
        },
      ],
    },
  ]
}

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        {
          text: 'What is Vite Router Next?',
          link: '/guide/what-is-vite-router-next',
        },
        {
          text: 'Getting Started',
          link: '/guide/getting-started',
        },
      ],
    },
    {
      text: 'Routing',
      collapsed: false,
      items: [
        {
          text: 'Defining Routes',
          link: '/guide/defining-routes',
        },
        {
          text: 'Pages and Layouts',
          link: '/guide/pages-and-layouts',
        },
        {
          text: 'Linking and Navigating',
          link: '/guide/linking-and-navigating',
        },
        {
          text: 'Route Groups',
          link: '/guide/route-groups',
        },
        {
          text: 'Dynamic Routes',
          link: '/guide/dynamic-routes',
        },
        {
          text: 'Catch All Routing',
          link: '/guide/catch-all-routing',
        },
        {
          text: 'Loading UI',
          link: '/guide/loading-ui',
        },
        {
          text: 'Error Handling',
          link: '/guide/error-handling',
        },
      ],
    },
    {
      text: 'Data Fetching',
      collapsed: false,
      items: [
        {
          text: 'Fetching',
          link: '/guide/data-fetching',
        },
        {
          text: 'With Tanstack Query React',
          link: '/guide/data-fetching-with-tanstack-query-react',
        },
      ],
    },
  ]
}
