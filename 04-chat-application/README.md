# Chat App

A chat application built with React and [socket.io](https://socket.io/)

<img width="1422" alt="Screenshot-chat-app" src="https://user-images.githubusercontent.com/13863914/216822324-fbcfea21-6fe7-4721-a5f8-0028c868a792.png">

## Available Scripts

### `npm install`

Add all the dependencies and devDependencies

### `cd server` & `npm start`

Make the http server listen on port 400

### `cd client` & `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Architecture

### client

- **Chat**: The chat application
  - **ConversationList**:
    - A list of conversations (name)
  - **SelectedConversation**:
    - A list of messages in the conversation (last_updated, text)
    - A reply section at the bottom

### server

- **HTTP API**: fetch conversation
- **real-time API**: send message (e.g. socket.emit, socket.on)

## Real Time Update

- tech: websocket
- tool: socket.io

## Web Storage

### HTTP API response

- tech: cache
- tool: use [SWR](https://swr.vercel.app/) (TODO)

### client-side database

- why: offline support
- tech: indexedDB, to store structured data
- tool: use [IndexedDB Promised](https://github.com/jakearchibald/idb)

- Create 2 object stores for `Chat` database

  1. `conversation` object store
  2. `message` object store

<img width="803" alt="dbDiagram" src="https://user-images.githubusercontent.com/13863914/216821212-29d5a3bb-1412-499d-9e67-3f17aafa38fa.png">

## Possible Improvements or Additional Remarks

### Optimizations

- different states for message
  - send
  - sent (one tick icon)✔️
  - read (double ticks icon)✔️ ✔️
  - failed (warn icon)✖️
- keyboard shortcuts
- auto scroll
- other kinds of message formats support
  - e.g. pdf, img, mp4

### APIs

- GET `/chat/getConversations`
- GET `/chat/getMessagesById`
- POST `/chat/createMessageById`
- PUT `/chat/updateMessageById`

### Data Flow

HTTP fetch conversations (swr) <br/>
➡️ store conversation object (indexedDB) <br/>
➡️ click on a conversation <br/>
➡️ HTTP fetch messages by ID & pagination (swr) <br/>
➡️ store message object (indexedDB) <br/>
