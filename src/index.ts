import * as fs from 'fs';
import express from 'express';
import Showdown from 'showdown';
const app = express();

const css = fs.readFileSync('./res/index.css', 'utf-8');
const pageJS = fs.readFileSync('./res/index.js', 'utf-8');

// Fetch raw markdown data from the Gist URL
function processGist(gistURL: string, res: express.Response) {
  fetch(gistURL)
    .then((response) => response.text())
    .then((markdown) => {
      // Render the markdown into HTML using Showdown
      const baseUrl = new URL(gistURL).origin;
      const converter = new Showdown.Converter({
        linkify: true,
        base: baseUrl,
        ghCodeBlocks: true,
        ghCompatibleHeaderId: true,
      });
      const converted = converter.makeHtml(markdown);
      if (!converted) {
        console.log('Conversion issue');
        return;
      }
      let html = '<div class="top-bar">Custom Top Bar</div>';
      html += converted;
      html += '<style>' + css + '</style>';
      html += '<script>' + pageJS + '</script>';
      res.send(html);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send('An error occurred');
    });
}

app.use(express.urlencoded({ extended: false }));
app.get('/smart', (req, res) => {
  const user = req.query.user as string;
  const gistId = req.query.gistId as string;
  const gistName = req.query.gistName as string;
  const gistURL = `https://gist.github.com/${user}/${gistId}/raw/${gistName}.md`;
  if (!user || !gistId || !gistName) {
    res.status(400).send('Missing data. Expected `?user=<gh_user_name>&gistId=<gist_id>&gistName=<gist_name>` got: ' + JSON.stringify(req.query, null, 2));
    return;
  }
  processGist(gistURL, res);
});
app.get('/raw', (req, res) => {
  const gistURL = req.query.gistURL as string;
  if (!gistURL) {
    res.status(400).send('Missing data. Expected `?gistUrl=<gist_url>` got: ' + JSON.stringify(req.query, null, 2));
    return;
  }
  processGist(gistURL, res);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
