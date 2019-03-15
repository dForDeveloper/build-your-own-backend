# Vintage MTG API
Vintage MTG API is a REST API built with Node, Express, and PostgreSQL that contains all Magic the Gathering sets and cards that are legal in the vintage format.

## Database Schema

### Sets
| Parameter    | Data Type |
|:-------------|:----------|
| id           | integer   |
| name         | string    |
| code         | string    |
| set_size     | integer   |
| release_date | string    |

### Cards
| Parameter        | Data Type |
|:-----------------|:----------|
| id               | integer   |
| name             | string    |
| mana_cost        | string    |
| cmc              | integer   |
| colorless        | boolean   |
| white            | boolean   |
| blue             | boolean   |
| black            | boolean   |
| red              | boolean   |
| green            | boolean   |
| supertype        | string    |
| artifact         | boolean   |
| creature         | boolean   |
| enchantment      | boolean   |
| instant          | boolean   |
| land             | boolean   |
| planeswalker     | boolean   |
| sorcery          | boolean   |
| tribal           | boolean   |
| subtype          | string    |
| set_name         | string    |
| set_code         | string    |
| rarity           | string    |
| rules_text       | string    |
| loyalty          | string    |
| power            | string    |
| toughness        | string    |
| collector_number | string    |
| artist           | string    |
| layout           | string    |
| commander        | string    |
| legacy           | string    |
| modern           | string    |
| standard         | string    |
| vintage          | string    |
| set_id           | integer   |

## Endpoints

### Sets
* __GET `/api/v1/sets`__ returns a response with all sets in the database.
  ```
  [
    {
      "id": 1,
      "name": "Tenth Edition",
      "code": "10E",
      "set_size": 508,
      "release_date": "2007-07-13"
    },
    {
      "id": 2,
      "name": "Unlimited Edition",
      "code": "2ED",
      "set_size": 302,
      "release_date": "1993-12-01"
    },
    ...
  ]
  ```
  ___
* __GET `/api/v1/sets/:id`__ returns a response with the set corresponding to the `id` parameter in the request.
  ```
  [
    {
      "id": 42,
      "name": "Conspiracy: Take the Crown",
      "code": "CN2",
      "set_size": 222,
      "release_date": "2016-08-26"
    }
  ]
  ```
  ___
* __POST `/api/v1/sets`__ allows for creating new sets.

  Valid request body structure:
  ```
  {
    "name": <string>,
    "code": <string>,
    "set_size": <integer>,
    "release_date": <string>
  }
  ```

### Cards
* __GET `/api/v1/cards`__ returns a response with all cards in the database.

  __NOT RECOMMENDED__
  
  Long load time due to 42,000+ cards
  ```
  [
    {
      "id": 1,
      "name": "Ancestor's Chosen",
      "mana_cost": "{5}{W}{W}",
      "cmc": 7,
      "colorless": false,
      "white": true,
      "blue": false,
      "black": false,
      "red": false,
      "green": false,
      "supertype": null,
      "artifact": false,
      "creature": true,
      "enchantment": false,
      "instant": false,
      "land": false,
      "planeswalker": false,
      "sorcery": false,
      "tribal": false,
      "subtype": "Human Cleric",
      "set_name": "Tenth Edition",
      "set_code": "10E",
      "rarity": "uncommon",
      "rules_text": "First strike (This creature deals combat damage before creatures without first strike.)\nWhen Ancestor's Chosen enters the battlefield, you gain 1 life for each card in your graveyard.",
      "loyalty": null,
      "power": "4",
      "toughness": "4",
      "collector_number": "1",
      "artist": "Pete Venters",
      "layout": "normal",
      "commander": "Legal",
      "legacy": "Legal",
      "modern": "Legal",
      "standard": null,
      "vintage": "Legal",
      "set_id": 1
    },
    ...
  ]
  ```
  ___
* __GET `/api/v1/cards/:id`__ returns a response with the card corresponding to the `id` parameter in the request.
  ```
  [
    {
      "id": 20657,
      "name": "Black Lotus",
      "mana_cost": "{0}",
      "cmc": 0,
      "colorless": true,
      "white": false,
      "blue": false,
      "black": false,
      "red": false,
      "green": false,
      "supertype": null,
      "artifact": true,
      "creature": false,
      "enchantment": false,
      "instant": false,
      "land": false,
      "planeswalker": false,
      "sorcery": false,
      "tribal": false,
      "subtype": "",
      "set_name": "Limited Edition Alpha",
      "set_code": "LEA",
      "rarity": "rare",
      "rules_text": "{T}, Sacrifice Black Lotus: Add three mana of any one color.",
      "loyalty": null,
      "power": null,
      "toughness": null,
      "collector_number": "232",
      "artist": "Christopher Rush",
      "layout": "normal",
      "commander": "Banned",
      "legacy": "Banned",
      "modern": null,
      "standard": null,
      "vintage": "Restricted",
      "set_id": 164
    }
  ]
  ```
  ___  
* __GET `/api/v1/cards?`__ responds with all cards matching the query parameters.
  
  Request:
  
  `/api/v1/cards?set_name=Ravnica+Allegiance&rarity=mythic&red=true&creature=true`

  Response:
  ```
  [
    {
      "id": 35606,
      "name": "Skarrgan Hellkite",
      ...,
      "red": true,
      ...,
      "creature": true,
      ...,
      "set_name": "Ravnica Allegiance",
      ...,
      "rarity": "mythic",
      ...
    },
    {
      "id": 35693,
      "name": "Ravager Wurm",
      ...,
      "red": true,
      ...,
      "creature": true,
      ...,
      "set_name": "Ravnica Allegiance",
      ...,
      "rarity": "mythic",
      ...
    },
    ...
  ]
  ```
  ___
* __POST `/api/v1/cards`__ allows for creating new cards.

  Valid request body format:
  ```
  {
    "name": <string>,
    "mana_cost": <string>,
    "cmc": <integer>,
    "colorless": <boolean>,
    "white": <boolean>,
    "blue": <boolean>,
    "black": <boolean>,
    "red": <boolean>,
    "green": <boolean>,
    "supertype": <string>,
    "artifact": <boolean>,
    "creature": <boolean>,
    "enchantment": <boolean>,
    "instant": <boolean>,
    "land": <boolean>,
    "planeswalker": <boolean>,
    "sorcery": <boolean>,
    "tribal": <boolean>,
    "subtype": <string>,
    "set_name": <string>,
    "set_code": <string>,
    "rarity": <string>,
    "rules_text": <string>,
    "loyalty": <string>,
    "power": <string>,
    "toughness": <string>,
    "collector_number": <string>,
    "artist": <string>,
    "layout": <string>,
    "commander": <string>,
    "legacy": <string>,
    "modern": <string>,
    "standard": <string>,
    "vintage": <string>,
    "set_id": <integer>
  }
  ```
  ___
* __DELETE `/api/v1/cards/:id`__ deletes the card corresponding to the `id` parameter in the request.