describe('API Tests TOOLS QA demo book store API https://demoqa.com/swagger/#/', () => {
    let authToken: string;
    let userId: string;
    let randomUsername: string;
    let randomPassword: string;
    let booksData: any;


    // The following tests will:
    // - Create a new user and store its user id (used in the other requests)
    // - Obtains auth token
    // - Gets a list of books
    // - Posts books to the user, and tests for negative cases

    function generateRandomCredentials() {
        randomUsername = `User${Math.floor(Math.random() * 10000)}`;
        randomPassword = `Pass${Math.floor(Math.random() * 10000)}!`;
    }

    it('Generate a user with random credentials', () => {
        generateRandomCredentials();
        cy.request({
            method: 'POST',
            url: 'https://demoqa.com/Account/v1/User',
            body: {
                userName: randomUsername,
                password: randomPassword
            }
        }).then((response) => {
            console.log('User Creation Response:', response);
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('userID');
            userId = response.body.userID;
            expect(userId).to.exist;
        });
        console.log(randomUsername)
        console.log(randomPassword)

    });

    it('Obtains an authorization token', () => {
        cy.request({
            method: 'POST',
            url: 'https://demoqa.com/Account/v1/GenerateToken',
            body: {
                userName: randomUsername,
                password: randomPassword
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            authToken = response.body.token;
            expect(authToken).to.exist;
        });
    });

    it('Retrieves the list of books', () => {
        cy.request({
            method: 'GET',
            url: 'https://demoqa.com/BookStore/v1/Books'
        }).then((response) => {
            expect(response.status).to.eq(200);
            booksData = response.body.books;
            expect(booksData).to.be.an('array').that.is.not.empty;
        });
    });

    it('Adds a list of books successfully', () => {
        const selectedBooks = booksData.slice(0, 3).map((book: { isbn: any; }) => ({ isbn: book.isbn }));

        cy.request({
            method: 'POST',
            url: 'https://demoqa.com/BookStore/v1/Books',
            body: {
                userId: userId,
                collectionOfIsbns: selectedBooks
            },
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });

    it('Fails to add list of books with invalid userID', () => {
        const selectedBooks = booksData.slice(0, 3).map((book: { isbn: any; }) => ({ isbn: book.isbn }));

        cy.request({
            method: 'POST',
            url: 'https://demoqa.com/BookStore/v1/Books',
            body: {
                userId: "INVALID",
                collectionOfIsbns: selectedBooks
            },
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it('Fails to add books when ISBN list is empty', () => {
        cy.request({
            method: 'POST',
            url: 'https://demoqa.com/BookStore/v1/Books',
            body: {
                userId: userId,
                collectionOfIsbns: []
            },
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('Fails to add books when ISBN is invalid', () => {
        const invalidBooks = [{ isbn: 'invalid-isbn' }];

        cy.request({
            method: 'POST',
            url: 'https://demoqa.com/BookStore/v1/Books',
            body: {
                userId: userId,
                collectionOfIsbns: invalidBooks
            },
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('Fails to add books when unauthorized', () => {
        const selectedBooks = booksData.slice(0, 3).map((book: { isbn: any; }) => ({ isbn: book.isbn }));

        cy.request({
            method: 'POST',
            url: 'https://demoqa.com/BookStore/v1/Books',
            body: {
                userId: userId,
                collectionOfIsbns: selectedBooks
            },
            headers: {
                'Authorization': 'Bearer invalid-token'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });
});