## Reddit Clone App

> A reddit like app, implement partial functionalities of Reddit.

## Archetect

### Request Flow

Since I'm using server side rendering, the request flow goes like this:

|---------|      |----------------|      |--------------|
| Browser | ---> | Frontend Node  | ---> | Backend Node |
|---------|      |----------------|      |--------------|

> Frontend Node serves as request proxy purpose.

### Why serverside rendering?

There isn't any specific reason to use serverside rendering in this task. The main reason might be I happend to built an serverside rendering tool and wanted to use what I have on hand.

## Routes

routes is at `/src/routes.jsx`

|route  | purpose           |
|-------|-------------------|
|  /    | list of topics    |
|/home  | list of topics    |
|/create| create new topic  |

## Topic Listing

After done rendering (componentDidMount) `containers/Threads.jsx`, action is dispatch to to server to pull down the list of topics. Renew the list in the Redux store will trigger rerender of the connected component, in this case `containers/Threads.jsx` and consequently renew the topics list.

## Upvote, Downvote

Each click on the Upvote / Downvote icon, an edit action is dispatch along with the payload. After request succeed, renew that specific topic with newly updated topic in the redux store. This will triggered the rerender and consequently update the connected component.

## Create Thread

A create action is dispatched and the request is submitted to the server. A newly created topic will return upon the success of creating topic. Concat the topic to the current redux store to trigger rerender on the list.

## Run dev build

prompt following command to start developing.

`npm run dev`

## Run production build

`npm run build:prod`

## Start production server

Start and monitor / daemon server process using PM2

`npm run start`

## Run tests

test regards 2 parts

1. reducer
2. sagas

run:

`npm run test`
