import {
    Notice,
    ObsidianProtocolData
} from "obsidian";
import {
    StructuredPaperData
} from "./paperData";

export interface ObsidianScholarUriParameters {
    command: string;
    paper?: StructuredPaperData;
    source?: string;
}

// Currently supported parameters are:
//		command: string
//			- required
//			- one of the following values: "createPaper"
//		paper: JSON
//			- required for "createPaper" command.
//			- URL encoded JSON object of type StructuredPaperData
//		source: string
//			- optional
//			- a name identifying the source of the uri scheme request

// URI Protocol.
/**
 * 
 * @param data - The Obsidian Protocol Data instance.
 * @returns - The parsed URI Command Parameters.
 */
export function	parseProtocolParameters(data: ObsidianProtocolData): ObsidianScholarUriParameters {

    // Get a reference to the source name.
    var sourceName = data.hasOwnProperty("source") ? data.source : "unkown source";

    // Verify command parameter is present.
    if (data.command == undefined) {
        // Command argument is missing.
        throw new Error(`URI protocol received but required "command" parameter is missing.`);
    }

    let parameters: ObsidianScholarUriParameters = {
        command: data.command,
        paper: undefined,
        source: sourceName
    }

    // Parse the paper data if it is present.
    if (data.paper != undefined) {
        try {

            // The paper data is present, so attempt to parse it.
            parameters.paper = parsePaperParameter(data.paper);

        } catch (error) {

            // Bubble up the error.
            throw new Error(`Error parsing paper data from "paper" parameter. ${error}`);
        }
    }

    return parameters;
}

/**
 * Parses paper data from the URI-encoded JSON string representation.
 * @param paperString - A string representing a JSON object. Each property of the JSON object should be encoded with "encodeURIComponent" if needed.
 * @returns - The parsed StructuredPaperData from the URI-encoded JSON string representation.
 */
function parsePaperParameter(paperString: string): StructuredPaperData {

    // Parse the paper data from the URI encoding.
    const paperObject = JSON.parse(paperString);
    Object.keys(paperObject).forEach((key) => {
        paperObject[key] = decodeURIComponent(paperObject[key]);
    });

    // If the paper data does not contain all of the required fields, throw an error.
    if (!paperObject.hasOwnProperty("title") || !paperObject.hasOwnProperty("authors") || !paperObject.hasOwnProperty("abstract")) {
        
        var missingFields =
            paperObject.hasOwnProperty("title") ? "" : "title," +
            paperObject.hasOwnProperty("authors") ? "" : "authors," +
            paperObject.hasOwnProperty("abstract") ? "" : "abstract";
        if(missingFields[missingFields.length - 1] == ",") {
            missingFields = missingFields.substring(0, missingFields.length - 1);
        }
        
        throw new Error(`Required JSON fields in "paper" parameter of URI are missing: ${missingFields}.`);
    }

    // Create the paper data object.
    const paperData: StructuredPaperData = {
        title: paperObject.title,
        authors: paperObject.authors.split(","),
        abstract: paperObject.abstract,
        url: paperObject.hasOwnProperty("url") ? paperObject.url : null,
        venue: paperObject.hasOwnProperty("venue") ? paperObject.venue : null,
        publicationDate: paperObject.hasOwnProperty("publicationDate") ? paperObject.publicationDate : null,
        tags: paperObject.hasOwnProperty("tags") ? paperObject.tags : null,
        bibtex: paperObject.hasOwnProperty("bibtex") ? paperObject.bibtex : null,
        pdfPath: paperObject.hasOwnProperty("pdfPath") ? paperObject.pdfPath : null,
        pdfUrl: paperObject.hasOwnProperty("pdfUrl") ? paperObject.pdfUrl : null,
        citekey: paperObject.hasOwnProperty("citekey") ? paperObject.citekey : null,
    };

    return paperData;
}