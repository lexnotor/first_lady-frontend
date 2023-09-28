<div align="center">
  <img src="https://res.cloudinary.com/dkm0afqqy/image/upload/v1695902423/firstlady/one_logo_l7ybtg.png"/>
  <p><b>PREMIERE DAME</b></p>
</div>

## Description

Application Web (partie **frontend**) de vente des pagne en ligne et sur place.

## Installation

```bash
$ git clone https://github.com/lexnotor/first_lady-frontend.git frontend
$ cd frontend
$ pnpm install
```

## CONFIGURATION

Cette application frontend, a besoint d'un [backend](https://github.com/lexnotor/first_lady-backend.git) pour fonctionner. Pour cela il faudra indiquer dans les fichiers _`frontend/app/admin/.env`_ et _`frontend/app/client/.env`_ l'adresse de l'application backend.

```bash
NEXT_PUBLIC_BACKEND=http://localhost:3500
```

## DEMARRER LES APP

Ce repo est un monorepo qui contient les parties admin et client de l'application. Dans votre terminal:

```bash
# En mode développement
$ pnpm dev

# En mode production
$ pnpm build && pnpm start
```
