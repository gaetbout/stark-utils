🔴 Deployed at https://www.stark-utils.xyz/converter 🔴

# Description

This repository is a Fork.  
Stark-utils is a simple web application that aims at being a toolbox for Cairo developpers.  
It allows to:

-   Converter: Convert any input to a felt, a string, the hexadecimal value, ...
-   L1->L2: Allows to compute the hash of a TX sent to L2
-   Signature: TBD

## History (page removed)

-   Status checker: Check the status of a Tx  
     Reason: Better using a block explorer
-   Call function: Allows to call a specific contract at specific etry point with sepcific inputs  
     Reason: Better using a block explorer

## TODO list

-   Add a page with infos such as MAX_FELT, table of power of 2, list of BIG tokens and their address (ETH, DAI, USDC, USDT, ... WITH A WARNING TO ALWAYS DOUBLE CHECK THOSE) other stuff?
-   Figure out what does the page Signature and rename if needed and rework code
-   Modal to explain each page
-   Some packages are obsolete, get rid of bootstrap ==> restart from a blank project and rebuild it
-   Do "About" page with link to github
-   Adding a way to have dec array to string?
-   Save selector as local storage? ==> Is the store used or planned to be used? If not ==> Remove it
-   Once Fees are reworked do: https://stark-fees.vercel.app/
-   Do a page using: getStorageAt: https://www.starknetjs.com/docs/API/provider#methods
-   Do a page using: getTransactionReceipt: https://www.starknetjs.com/docs/API/provider#methods

## Dev Tools for StarkNet

**_install dependencies_**

```bash
npm run install
```

**_serve local_**

```bash
npm run serve
```

**_build_**

```bash
npm run build
```

\***\*lint\*\***

```bash
npm run lint
```
