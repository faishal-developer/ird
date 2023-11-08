Live Link: [live link](https://assignment-3-seven.vercel.app/)

Application Routes:
### User
api/v1/users/signup (POST)

api/v1/users (GET)

api/v1/users/64e1aa96250fc7ec044e31bf (Single GET) Include an id that is saved in your 

api/v1/users/64e1aa96250fc7ec044e31bf (PATCH)

api/v1/users/64e1aa96250fc7ec044e31bf (DELETE) Include an id that is saved in your database

### Cows
api/v1/cows (POST)

api/v1/cows (GET)

api/v1/cows/64e1aab3250fc7ec044e31c2 (Single GET) Include an id that is saved in your database

api/v1/cows/64e1aab3250fc7ec044e31c2 (PATCH)

api/v1/cows/64e1aab3250fc7ec044e31c2 (DELETE) Include an id that is saved in your database
Pagination and Filtering routes of Cows

api/v1/cows?pag=1&limit=10

api/v1/cows?sortBy=price&sortOrder=asc

api/v1/cows?minPrice=500&maxPrice=1000

api/v1/cows?location=Chattogram

api/v1/cows?searchTerm=bra

### Orders
api/v1/orders (POST)

api/v1/orders (GET)
