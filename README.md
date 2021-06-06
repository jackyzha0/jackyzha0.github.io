![github pages](https://github.com/jackyzha0/jackyzha0.github.io/workflows/github%20pages/badge.svg)

# ✨ Personal Site v2.1
### powered by Hugo and Go Templates

Built with [lite.css](https://github.com/jackyzha0/lite.css), Hugo, and plain HTML/JS/CSS. 

### Why I switched
I got tired of adding `div`s and other stuff manually everytime I wanted to update a project / add new stuff, so I decided to something more powerful that supports templating to do it for me automatically.

### Where is everything
You can find the 'main' `index.html` under `layouts/index.html`. It now just references a bunch of `partial` blocks which you can find all over `layouts/partials`. These are all reused components from the old static site, except all the details are now filled in using data files found in `data`. So now, I can just edit stuff in `data` and generate new stuff for my site!

All content is located under `/content` which includes my newsletter issues, blog posts, books I'm ready, and more!

### Can I use your site as a template?
I spent a lot of time on this website so if you plan on using this website as a template or base for your own personal site, I kindly ask you to credit me somewhere within the GitHub repository or on the actual site itself if you intend to not release the source code.

TLDR; yes, but please credit me somwhere.