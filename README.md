# Description

This repository is a Fork.  
Stark-utils is a simple web application that aims at being a toolbox for Cairo developpers.  
It allows to:
- Converter: Convert any input to a felt, a string, the hexadecimal value, ...  
- L1->L2: Allows to compute the hash of a TX sent to L2 
- Signature: TBD 


## History (page removed)
- Status checker: Check the status of a Tx   
    Reason: Better using a block explorer
- Call function: Allows to call a specific contract at specific etry point with sepcific inputs  
    Reason: Better using a block explorer

## TODO list
 - Add a page with infos such as MAX_FELT, table of power of 2, list of BIG tokens and their address (ETH, DAI, USDC, USDT, ... WITH A WARNING TO ALWAYS DOUBLE CHECK THOSE) other stuff?
 - Figure out what does the page Signature and rename if needed and rework code
 - Modal to explain each page
 - Some packages are obsolete, get rid of bootstrap ?
 - Do "About" page with link to github
 - Adding  a way to have dec array to string?
 - Save selector as local storage? ==> Is the store used or planned to be used? If not ==> Remove it
 - For L1L2 msg provide a tx hash and fetch all info directly?

## Dev Tools for StarkNet

***install dependencies***

```bash
yarn install
```

***serve local***

```bash
yarn serve
```

***build***

```bash
yarn build
```
For linux user replace ```yarn``` by ```npm run```
