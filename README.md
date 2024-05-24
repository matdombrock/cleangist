# Show GH Gists without the fluff

This is a fairly simple Express server which grabs raw gist data from GitHub (Markdown format) and converts it to plain (but nice looking) HTML without the extra GH stuff. 

Take a gist URL like this:
```
https://gist.github.com/JaredVogt/07462028c47477b8a001e9faf7f7e251#file-propatch-md
```

Convert and extract the required info:
- User Name
- Gist ID
- File name

Send it to the `smart` endpoint:
```
<server_url>/smart?user=JaredVogt&gistId=07462028c47477b8a001e9faf7f7e251&gistName=propatch
```

**Note: It would be easy to restrict the user name to prevent potential abuse.**

## How it works:

- Grab raw Gist data from GH
- Convert to HTML with showdown
- Inject extra HTML/JS/CSS (formatting and extra features)
- Serve the created HTML data. 

By using the URL format:
```
https://gist.github.com/${user}/${gistId}/raw/${gistName}.md
```

We can ensure that we always get the latest version of the data [without worrying about changing URLs](https://stackoverflow.com/questions/12522539/github-gist-editing-without-changing-url).