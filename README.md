# FinerEli
Kattavampi Fineli API

# Motivaatio

Finelin tarjoamat valmiit APIt antavat tietoja vain pienestä määrästä ravintotekijöitä ruoka-ainetta kohti, 
vaikka Finelin tietokanta itsessään sisältää  tiedot 74:sta ravintotekijästä. Tulevia projektejani varten 
tarvitsen APIn joka tarjoaa tiedon kaikista näistä. Siispä tein sellaisen itse.

# Toiminta

API koostuu yhdestä polusta, joka sisältää kaksi eri toiminnallisuutta:

`/food/?q=[hakusana]` palauttaa kaikki tietokannasta löytyvät ruoka-aineiden nimet ja idt, jotka sisältävät sanan [hakusana].<br>
`/food/:id` palauttaa tiedon kaikista 74:sta ravintotekijästä annettua id:tä vastaavaa ruoka-ainetta kohti.

# Riippuvuudet

- node
- express
- helmet
- winston
- morgan
- express-rate-limit
- dotenv
- mysql

# Testaaminen

1. Aja projektin juuresta löytyvät tietokannan luontiskripti `finer_eli.sql`.
2. Täytä tietokannan taulut [Finelistä](https://fineli.fi/fineli/fi/avoin-data) löytyvällä datalla (peruspaketti 2).
3. Uudelleen nimeä projektin juuressa oleva .sample-env-tiedosto .env:ksi.
4. Avaa .env ja täytä ympäristömuuttujien arvot
5. Suorita komentorivillä `npm run start`

* * *
Tietojen alkuperäislähde: Terveyden ja hyvinvoinnin laitos, Fineli. Tiedot käytettävissä Creative Commons 4.0 nimeä (CC-BY 4.0) -lisenssillä.
