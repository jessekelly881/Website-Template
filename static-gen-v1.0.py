#Very Simple Script. Generates an html page from a base page and markdown file
#arg1: base.html
#arg2: page.md
#Generates: page.html

from markdown2 import markdown
import jinja2
import os, sys, glob

base_file = 'build/base.html'
md_files = 'src/markdown/*.md'
output_folder = 'build'

extras=["footnotes", "tables"]

base = open(base_file)
for md_file in glob.glob(md_files):
    print md_file
    f = open(md_file)
    html = markdown(f.read(), extras=["footnotes"])

    generated_page = jinja2.Template(base.read()).render(content=html)

    base_name = os.path.basename(md_file)
    out_path = output_folder + "/" + os.path.splitext(base_name)[0] + '.html'
    out_f = open(out_path,'w+')
    out_f.write(generated_page)

    f.close()

base.close()
