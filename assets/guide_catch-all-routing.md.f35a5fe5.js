import{_ as s,o as a,c as e,O as o}from"./chunks/framework.a4d18f8e.js";const D=JSON.parse('{"title":"Catch All Routing","description":"","frontmatter":{},"headers":[],"relativePath":"guide/catch-all-routing.md","filePath":"guide/catch-all-routing.md"}'),t={name:"guide/catch-all-routing.md"},n=o(`<h1 id="catch-all-routing" tabindex="-1">Catch All Routing <a class="header-anchor" href="#catch-all-routing" aria-label="Permalink to &quot;Catch All Routing&quot;">​</a></h1><p>If you add a <code>$.tsx</code> file to the <code>pages</code> directory, it will be used as the catch-all routing component. This component will be rendered if there is no matching route.</p><div class="tip custom-block"><p class="custom-block-title">info</p><p><code>$.tsx</code> can be thought of as a unique page route component. If the current directory has a <code>layout.tsx</code> file, <code>$.tsx</code> will be rendered as a child component of layout.</p></div><p>For example, the following directory structure:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">└── pages</span></span>
<span class="line"><span style="color:#A6ACCD;">    ├── $.tsx</span></span>
<span class="line"><span style="color:#A6ACCD;">    ├── contact</span></span>
<span class="line"><span style="color:#A6ACCD;">    │   └── page.tsx</span></span>
<span class="line"><span style="color:#A6ACCD;">    └── page.tsx</span></span></code></pre></div><p>When a path that does not match is accessed, the <code>pages/$.tsx</code> component is rendered. Similarly, in <code>$.tsx</code>, you can use <code>useParams</code> to grab the remaining bits of the URL.</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-RZhq7" id="tab-zF-pMxi" checked="checked"><label for="tab-zF-pMxi">pages/$.tsx</label></div><div class="blocks"><div class="language-tsx active"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useParams</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react-router-dom</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// When the path is \`/xxx/yyy\`</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> params </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useParams</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">params[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">*</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// =&gt; &#39;xxx/yyy&#39;</span></span></code></pre></div></div></div>`,7),l=[n];function c(p,r,i,d,y,h){return a(),e("div",null,l)}const C=s(t,[["render",c]]);export{D as __pageData,C as default};
