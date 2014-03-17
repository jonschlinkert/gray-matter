> Why another YAML Front Matter library?

Because other libraries we tried failed to meet our requirements with [Assemble](http://assemble.io). Some most of the libraries met most of the requirements, but _none had all of them_. Here are the most important:

* Be usable, if not simple
* Allow custom delimiters
* Use a dependable and well-supported library for parsing YAML
* Don't fail if YAML front matter exists, but no content
* Don't fail if content exists, but no YAML front matter
* Have no problem reading YAML files directly
* Have no problem with complex content, including fenced code blocks containing examples of YAML front matter.
* Should return an object that contains the parsed YAML front matter and content, as well as the "original" content.
