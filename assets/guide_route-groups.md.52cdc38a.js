import{_ as e,o as s,c as o,O as a}from"./chunks/framework.a4d18f8e.js";const m=JSON.parse('{"title":"Route Groups","description":"","frontmatter":{},"headers":[],"relativePath":"guide/route-groups.md","filePath":"guide/route-groups.md"}'),n={name:"guide/route-groups.md"},t=a(`<h1 id="route-groups" tabindex="-1">Route Groups <a class="header-anchor" href="#route-groups" aria-label="Permalink to &quot;Route Groups&quot;">​</a></h1><p>In the <code>pages</code> directory, nested folders are normally mapped to URL paths. However, you can mark a folder as a <strong>Route Group</strong> to prevent the folder from being included in the route&#39;s URL path.</p><p>This allows you to organize your route segments and project files into logical groups without affecting the URL path structure.</p><p>Route groups are useful for:</p><ul><li>Organizing routes into groups e.g. by site section, intent, or team.</li><li>Enabling nested layouts in the same route segment level: <ul><li>Creating multiple nested layouts in the same segment, including multiple root layouts</li><li>Adding a layout to a subset of routes in a common segment</li></ul></li></ul><h2 id="convention" tabindex="-1">Convention <a class="header-anchor" href="#convention" aria-label="Permalink to &quot;Convention&quot;">​</a></h2><p>A route group can be created by adding prefixing the folder name with two underscores <code>__</code> e.g. <code>__admin</code>.</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">└── routes</span></span>
<span class="line"><span style="color:#A6ACCD;">    ├── __auth</span></span>
<span class="line"><span style="color:#A6ACCD;">    │   ├── layout.tsx</span></span>
<span class="line"><span style="color:#A6ACCD;">    │   ├── sign-in</span></span>
<span class="line"><span style="color:#A6ACCD;">    │   │   └── page.tsx</span></span>
<span class="line"><span style="color:#A6ACCD;">    │   └── sign-up</span></span>
<span class="line"><span style="color:#A6ACCD;">    │       └── page.tsx</span></span>
<span class="line"><span style="color:#A6ACCD;">    ├── layout.tsx</span></span>
<span class="line"><span style="color:#A6ACCD;">    └── page.tsx</span></span></code></pre></div><p><strong>Vite Router Next</strong> will generate two routes:</p><ul><li><code>/sign-in</code></li><li><code>/sign-up</code></li></ul><p>The <code>__auth/layout.tsx</code> component will serve as the layout component for <code>sign-in/page.tsx</code> and <code>sign-up/page.tsx</code>, but <strong>__auth</strong> will not be a route path segment.</p>`,12),l=[t];function r(p,i,u,c,d,g){return s(),o("div",null,l)}const _=e(n,[["render",r]]);export{m as __pageData,_ as default};