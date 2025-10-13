# Obsidian Scholar

## Usage  

### Streamlined Library Management

#### Add Paper from External Link
Upon seeing a paper on the web (Slack, Twitter, etc.), you can add the paper to your local library: running this tool can download the paper PDF, and create the corresponding paper note with paper metadata.

https://github.com/user-attachments/assets/792f4612-5bbf-4885-9e04-24ece50e6729


#### Search and Retrieval
You can quickly search and retrieve the papers in your library, as well as optionally query and find papers from SemanticScholar directly if they are not in your library.

https://github.com/user-attachments/assets/55470ce5-5081-4bcd-b033-a762bacd8c2d

1. When you select between papers, you can hit `Tab` to show and hide the paper abstract. 
2. If you want to use SemanticScholar to search the paper, you can hit `shift + enter` 

### Enhanced Paper Reading 

#### Check Paper Reference
Obsidian Scholar allows you checking the details of the referred papers without leaving the tool. 

https://github.com/user-attachments/assets/95f6749c-dd54-4c98-a2d3-18ae5e08fe05


#### Copy Paper BibTex

https://github.com/user-attachments/assets/10668d77-e681-4c68-9147-38a83a30cfa5


#### Google-Scholar PDF reader like popover and library management 

https://github.com/user-attachments/assets/4b4681d8-6f8e-4e8f-b16a-7e8e8c21934e

When you have a paper PDF it can display the citation information directly in-place. It allows for checking the paper in the obsidian scholar ecosystem. 

> [!Note]
> This is used in conjunction with the amazing PDF Reader plugin tool [Obsidian PDF++](https://github.com/RyotaUshio/obsidian-pdf-plus). Right now I am trying to add the PR into their repo (track the status [here](https://github.com/RyotaUshio/obsidian-pdf-plus/pull/463)); for now you can install the plugin on your own https://github.com/lolipopshock/obsidian-pdf-plus/tree/add-scholar-support. 

##### Note-taking with Obsidian PDF++

https://github.com/user-attachments/assets/06f3f2e7-9a33-45c3-bb82-afd7f8ed36fb

By enabling auto-paste in Obsidian PDF++, the note will be automatically synced to the corresponding scholar note file for a paper PDF.

## Installation 

### Install from Obsidian Plugin Library 

This plugin is released on the Obsidian Plugin Library. You can install it directly from the Obsidian app [by searching `Scholar` in the community plugins](https://obsidian.md/plugins?search=scholar). 

### Manual Installation 

1. Open the `.obsidian/plugins` folder in your vault
2. Create a folder called `scholar` 
3. Download the three files `manifest.json`, `styles.css`, and `main.js` from the [latest release](https://github.com/lolipopshock/obsidian-scholar/releases/latest), and put the files in the `.obsidian/plugins/scholar` folder you just created. 
4. Open Obsidian and in `settings > community plugins`, find `Scholar` and enable the plugin. Be sure to change the `Scholar` settings properly before use. 

## Documentation

### Settings 

![Settings](.github/demo/settings.png)

- **Adding an SemanticScholar API Key**
  Sometimes you might experience rate limiting when querying papers from SemanticScholar. To avoid this, you can add your own SemanticScholar API key in the settings. You can obtain the API Key [here](https://www.semanticscholar.org/product/api#api-key).

## Motivation and Acknowledgement 

The goal of *Obsidian Scholar* is to create a smooth experience that spans from paper reading, note taking, and reflection and synthesis. 
The construction is based on two powerful ideas. 
- **[Annotated Bibliography](https://owl.purdue.edu/owl/general_writing/common_writing_assignments/annotated_bibliographies/annotated_bibliography_samples.html)** that takes short notes for papers and summarizes the key points in your personal bibliography.
- **[Zettlekasten](https://zettelkasten.de/)** note taking system that aims to take atomic and short notes and link them together. 

In *Obsidian Scholar*, we treat each paper as an individual note---we make it painless to ingest the paper PDF and create the note file---and the Obsidian app makes it easy to link paper notes and helps you to reflect and synthesize the knowledge. 

The development of the tools are inspired by many predecessors that are implemented in EMACS. 
- [citar](https://github.com/emacs-citar/citar): A reference manager work in EMACS. 
- [elfeed](https://github.com/skeeto/elfeed): A RSS reader in EMACS.
- [elfeed-score](https://github.com/sp1ff/elfeed-score): A RSS reader with scoring function in EMACS.

Also thanks the following people for their excellent blogposts and tutorials illustrating their paper reading workflow:
- [Managing a research workflow (bibliographies, note-taking, and arXiv)](https://emacsconf.org/2021/talks/research/) by [Ahmed Khaled](https://www.akhaled.org)
- [Managing ArXiv RSS Feeds in Emacs](https://cundy.me/post/elfeed/) by [Chris Cundy](https://cundy.me)

Some of the code is based on a previous project called [paper-note-filer](https://github.com/chauff/paper-note-filler) by [Claudia Hauff](https://chauff.github.io). 


## API Documentation

The Scholar plugin exposes a JavaScript API that can be used by other plugins or through Obsidian URIs. Access the API through `this.app.plugins.plugins.scholar.api`.

### Available Methods

#### `createPaperNoteFromUrl(url: string)`
Creates a paper note from a URL. Supports ArXiv and SemanticScholar URLs.

**Parameters:**
- `url` (string): The URL of the paper to create a note from

**Returns:** `Promise<void>`

**Example:**
```javascript
await this.app.plugins.plugins.scholar.api.createPaperNoteFromUrl("https://arxiv.org/abs/1706.03762");
```

#### `isPaperInLibrary(searchParams: PaperLibrarySearchParams)`
Checks if a paper exists in your library and returns detailed information about it.

**Parameters:**
- `searchParams` (object): Search parameters with the following optional fields:
  - `url?: string` - Paper URL
  - `title?: string` - Paper title
  - `citekey?: string` - BibTeX cite key
  - `bibstring?: string` - BibTeX string

**Returns:** `Promise<PaperLibraryCheckResult>`
- `isInLibrary: boolean` - Whether the paper exists in your library
- `filePath?: string` - Path to the paper note file (if found)
- `paperData?: StructuredPaperData` - Complete paper metadata (if found)

**Example:**
```javascript
// Search by title
const result = await this.app.plugins.plugins.scholar.api.isPaperInLibrary({
    title: "Attention Is All You Need"
});

// Search by URL
const result = await this.app.plugins.plugins.scholar.api.isPaperInLibrary({
    url: "https://arxiv.org/abs/1706.03762"
});

// Search by citekey
const result = await this.app.plugins.plugins.scholar.api.isPaperInLibrary({
    citekey: "vaswani2017attention"
});
```

#### `openPaper(searchParams: OpenPaperParams)`
Opens the paper search modal with pre-filled query or creates a paper note directly from URL.

**Parameters:**
- `searchParams` (object): Search parameters with the following optional fields:
  - `title?: string` - Paper title to search for
  - `bibstring?: string` - BibTeX string to parse
  - `url?: string` - Paper URL to create note from directly

**Returns:** `Promise<void>`

**Example:**
```javascript
// Open search modal with title
await this.app.plugins.plugins.scholar.api.openPaper({
    title: "attention is all you need"
});

// Create paper note from URL
await this.app.plugins.plugins.scholar.api.openPaper({
    url: "https://arxiv.org/abs/1706.03762"
});

// Parse BibTeX and open appropriate action
await this.app.plugins.plugins.scholar.api.openPaper({
    bibstring: "Tom B Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal, Arvind Neelakantan, Pranav Shyam, Girish Sastry, Amanda Askell, et al. 2020. Language models"
});
```

### Quick Testing with Obsidian URIs

You can test the API directly through Obsidian URIs. Copy and paste these URLs into your browser (while Obsidian is running) to test the functionality:

**Test if a paper is in your library by title:**
```
obsidian://adv-uri?eval=this.app.plugins.plugins.scholar.api.isPaperInLibrary%28%7Btitle%3A%22attention%20transformer%22%7D%29.then%28result%20%3D%3E%20console.log%28result%29%29
```

**Test if a paper is in your library by URL:**
```
obsidian://adv-uri?eval=this.app.plugins.plugins.scholar.api.isPaperInLibrary%28%7Burl%3A%22https%3A%2F%2Farxiv.org%2Fabs%2F1706.03762%22%7D%29.then%28result%20%3D%3E%20console.log%28result%29%29
```

**Create a paper note from ArXiv URL:**
```
obsidian://adv-uri?eval=this.app.plugins.plugins.scholar.api.createPaperNoteFromUrl%28%22https%3A%2F%2Farxiv.org%2Fabs%2F1706.03762%22%29.then%28%28%29%20%3D%3E%20console.log%28%22Paper%20created%22%29%29
```

**Open search modal with pre-filled title:**
```
obsidian://adv-uri?eval=this.app.plugins.plugins.scholar.api.openPaper%28%7Btitle%3A%22attention%20is%20all%20you%20need%22%7D%29.then%28%28%29%20%3D%3E%20console.log%28%22Modal%20opened%22%29%29
```

**Test with BibTeX string:**
```
obsidian://adv-uri?eval=this.app.plugins.plugins.scholar.api.openPaper%28%7Bbibstring%3A%22Tom%20B%20Brown%2C%20Benjamin%20Mann%2C%20Nick%20Ryder%2C%20Melanie%20Subbiah%2C%20Jared%20Kaplan%2C%20Prafulla%20Dhariwal%2C%20Arvind%20Neelakantan%2C%20Pranav%20Shyam%2C%20Girish%20Sastry%2C%20Amanda%20Askell%2C%20et%20al.%202020.%20Language%20models%22%7D%29.then%28%28%29%20%3D%3E%20console.log%28%22Action%20completed%22%29%29
```

> **Note:** The URI examples above require the [Advanced URI plugin](https://github.com/Vinzent03/obsidian-advanced-uri) to be installed and enabled. 

## URI Protocol

The Scholar plugin can be activated through the [Obsidian Protocol](https://docs.obsidian.md/Reference/TypeScript+API/Plugin/registerObsidianProtocolHandler).
The uri protocol base is:

`obsidian://scholar`

### Available Parameters

The following parameters are available:
- `command` (required)
- `source` (optional)
- `paper` (only required for some commands)

> **Note:**  All parameters must be properly URI encoded. Use [`encodeURI()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) to encode the URI. Use [`encodeURIComponent()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) to encode individual components as necessary.

#### command

The `command` parameter tells the Obsidian Scholar plugin what action to take.

This parameter is **required**.
The parameter must be one of the supported values listed below.

Supported values:
- `createPaper` - adds a paper from the given paper data (see `paper` parameter).

#### source

The `source` parameter is just used to identify where (the app/plugin/etc.) the URI protocol request originated from.

This parameter is **optional**.
The parameter can be any string value.
If you are developing an extension or external program that calls the Obsidian Scholar URI protocol, consider using a name users would recognize (such as the app's store name).

#### paper

The `paper` parameter is used to pass paper data to the Obsidian Scholar plugin.

This parameter is **required** if the `createPaper` value of the `command` parameter is used.
The parameter value must be a url-encoded string representation of a JSON object.

- `StructuredPaperData` (object): paper data with the following fields:
  - `title: string` - (required) Paper title
  - `authors: string[]` - (required) List of author names, comma-delimited
  - `abstract: string` - (required) Paper abstract
  - `url: string` - (optional) The URL where the paper can be found (used to link to the online version of the paper)
  - `venue: string` - (optional) The venue the paper was published in (conference proceedings, journal, book, etc.)
  - `publicationDate: string` - (optional) The date the paper was published
  - `bibtex: string` - (optional) A string in [bibtex citation format](https://www.bibtex.com/g/bibtex-format/).
  - `pdfUrl: string` - (optional) The URL where the PDF can be found at. Do not include if the PDF is access restricted.
  - `citekey: string` - (optional) The key from the bibtex citation.

> **Note:** Several of the fields in `StructuredPaperData` are not URL safe, and must be further encoded. Some of the individual field values (such as the `url` and `bibtex`) must be encoded with [`encodeURIComponent()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent).

**Example encoding:**
```javascript
// The paper data object.
let paperData = {
  title = "Attention Is All You Need",
  authors = "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin",
  abstract = "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks in an encoder-decoder configuration. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data.",
  url = "https://arxiv.org/abs/1706.03762",
  venue = "31st Conference on Neural Information Processing Systems (NIPS 2017)",
  publicationDate = "2023",
  bibtex = "@misc{vaswani2023attentionneed,\ntitle={Attention Is All You Need},\nauthor={Ashish Vaswani and Noam Shazeer and Niki Parmar and Jakob Uszkoreit and Llion Jones and Aidan N. Gomez and Lukasz Kaiser and Illia Polosukhin},\nyear={2023},\neprint={1706.03762},\narchivePrefix={arXiv},\nprimaryClass={cs.CL},\nurl={https://arxiv.org/abs/1706.03762},\n}",
  pdfurl = "https://arxiv.org/pdf/1706.03762",
  citekey = "vaswani2023attentionneed"
};

// Encode each individual field with encodeURIComponent().
Object.keys(paperData).forEach((key) => {
    paperData[key] = encodeURIComponent(paperData[key]);
});

// Create the final URI by encoding the entire JSON string.
let appName = "My App Name";
let jsonString = JSON.stringify(paperData);
let url = encodeURI(`obsidian://scholar?command=createPaper&paper=${jsonString}&source=${appName}`);
```