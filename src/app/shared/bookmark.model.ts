// bookmark.model.ts
import { v4 as uuidv4 } from 'uuid';

export class Bookmark {
    id: string;
    name: string;
    url: string;
    favicon?: string;
    description: string;  // Add description to store multiple lines of text

    constructor(name: string, url: string, description: string = '', favicon?: string) {
        this.id = uuidv4();

        try {
            // Convert the URL object to a string using .toString()
            this.url = new URL(url).toString();
        } catch (e) {
            console.error(`Invalid URL: ${url}`, e);
            // Use a default URL string if the provided one is invalid
            this.url = new URL('https://default-url.com').toString();
        }

        // Assign a default name if none is provided
        this.name = name || this.url;

        this.favicon = favicon;
        this.description = description || '';  // Default to an empty string if no description is provided
    }
}
