
# Дипломная работа

Бэкенд
## API

https://api.mm.nomoredomains.xyz/

#### Получить информацию о пользователе (email и имя)

```https
  GET /users/me
```

#### Обновить информацию о пользователе (email и имя)

```https
  PATCH /users/me
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Обязательно**. Имя |
| `email`      | `string` | **Обязательно**. Email |

#### Получить все сохранённые текущим  пользователем фильмы

```https
  GET /movies
```

#### Создать фильм

```https
  POST /movies
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `country`      | `string` | **Обязательно**. Страна |
| `director`      | `string` | **Обязательно**. Режиссёр |
| `duration`      | `number` | **Обязательно**. Длительность |
| `year`      | `string` | **Обязательно**. Год |
| `description`      | `string` | **Обязательно**. Описание |
| `image`      | `string` | **Обязательно**. Ссылка на постер |
| `trailerLink`      | `string` | **Обязательно**. Ссылка на трейлер |
| `thumbnail`      | `string` | **Обязательно**. Ссылка на миниатюру постера |
| `owner`      | `string` | **Обязательно**. ID пользователя |
| `movieId`      | `string` | **Обязательно**. ID фильма |
| `nameRU`      | `string` | **Обязательно**. Название фильма на русском |
| `nameEN`      | `string` | **Обязательно**. Название фильма на русском английском |

#### Удалить фильм

```https
  DELETE /movies/:id 
```

| Parameters | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Обязательно**. ID фильма |
