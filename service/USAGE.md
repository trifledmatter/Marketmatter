## Marketmatter Service
> This document will walk you through the different supported endpoints, as well as how to use them.
---
### 1. **Register**

**Endpoint:** `POST /api/auth/register`

**Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "company": "ACME Corp",
  "bio": "Marketing guru."
}
```

**Response:**  
- `201 Created` with marketer details.

### 2. **Login**

**Endpoint:** `POST /api/auth/login`

**Body:**
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

**Response:**  
- `200 OK` with `accessToken` and `refreshToken`.

### 3. **Logout**

**Endpoint:** `POST /api/auth/logout`

**Body:**
```json
{
  "refreshToken": "your_refresh_token_here"
}
```

**Response:**  
- `200 OK` with a confirmation message.

---

## Manage Marketers

All these routes need the `Authorization` header with your `accessToken`.

### 1. **Create Marketer**

**Endpoint:** `POST /api/marketers`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

**Body:** *(Same as Register)*

**Response:**  
- `201 Created` with marketer info.

### 2. **Get Marketer**

**Endpoint:** `GET /api/marketers/:id`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response:**  
- `200 OK` with marketer details.

### 3. **Update Marketer**

**Endpoint:** `PUT /api/marketers/:id`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

**Body:** *(Fields you want to update)*

**Response:**  
- `200 OK` with updated marketer info.

### 4. **Delete Marketer**

**Endpoint:** `DELETE /api/marketers/:id`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response:**  
- `200 OK` with a confirmation message.

### 5. **List Marketers**

**Endpoint:** `GET /api/marketers`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response:**  
- `200 OK` with an array of marketers.

---

## Manage Service Promotions

Same `Authorization` header needed.

### 1. **Create Promotion**

**Endpoint:** `POST /api/promotions`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Spring Sale",
  "content": "Enjoy up to 50% off!",
  "marketerId": "marketer_id_here",
  "targetCategories": ["fashion", "electronics"],
  "scheduledAt": "2025-03-20T10:00:00Z",
  "isActive": true
}
```

**Response:**  
- `201 Created` with promotion details.

### 2. **Get Promotion**

**Endpoint:** `GET /api/promotions/:id`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response:**  
- `200 OK` with promotion details.

### 3. **Update Promotion**

**Endpoint:** `PUT /api/promotions/:id`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

**Body:** *(Fields to update)*

**Response:**  
- `200 OK` with updated promotion info.

### 4. **Delete Promotion**

**Endpoint:** `DELETE /api/promotions/:id`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response:**  
- `200 OK` with a confirmation message.

### 5. **List Promotions**

**Endpoint:** `GET /api/promotions`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response:**  
- `200 OK` with an array of promotions.

---

## Manage Subscribers (Those who receive our emails)

Authorization required as usual.

### 1. **Create Subscriber**

**Endpoint:** `POST /api/subscribers`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "email": "subscriber@example.com",
  "targetCategories": ["technology", "health"]
}
```

**Response:**  
- `201 Created` with subscriber info.

### 2. **Get Subscriber**

**Endpoint:** `GET /api/subscribers/:id`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response:**  
- `200 OK` with subscriber details.

### 3. **Update Subscriber**

**Endpoint:** `PUT /api/subscribers/:id`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

**Body:** *(Fields to update)*

**Response:**  
- `200 OK` with updated subscriber info.

### 4. **Delete Subscriber**

**Endpoint:** `DELETE /api/subscribers/:id`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response:**  
- `200 OK` with a confirmation message.

### 5. **List Subscribers**

**Endpoint:** `GET /api/subscribers`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response:**  
- `200 OK` with an array of subscribers.

---


## cURL Examples

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "company": "ACME Corp",
  "bio": "Marketing guru."
}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "jane@example.com",
  "password": "password123"
}'
```

### Access Protected Route (List Marketers)
```bash
curl -X GET http://localhost:3000/api/marketers \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
-H "Content-Type: application/json" \
-d '{
  "refreshToken": "your_refresh_token_here"
}'
```

---

## Resolving Common Issues

- Encountering __401 Unauthorized__?
    - Check if your `accessToken` is valid and included in your request headers

- Encountering __422 Unprocessable Entity__?
    - Validate your request body fields and ensure they are of the right type

- Encountering __404 Not Found__?
    - First of all, you shouldn't be. Documentation for everything is right here.
    - Ensure you're hitting the correct endpoint with the right slugs or IDs.
