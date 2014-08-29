> Why another YAML Front Matter library?

Because other libraries we tried failed to meet our requirements with [Assemble](http://assemble.io). Some most of the libraries met most of the requirements, but _none had all of them_. Here are the most important:

* Be usable, if not simple
* Allow custom delimiters
* Use a dependable and well-supported library for parsing YAML and other languages
* Don't fail when no content exists
* Don't fail when no front matter exists
* Have no problem reading YAML files directly
* Have no problem with complex content, including fenced code blocks that contain examples of YAML front matter. Other parsers fail on this.
* Should return an object that contains the parsed YAML front matter and content, as well as the "original" content.
