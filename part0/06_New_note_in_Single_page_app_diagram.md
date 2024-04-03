```mermaid
sequenceDiagram
    participant browser
    participant server

Note right of browser: The POST request to the address new_note_spa contains the new note as JSON data

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP status code 201 created

```