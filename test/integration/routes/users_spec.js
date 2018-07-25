import User from '../../../src/models/user';

describe('Routes: Users', () => {
  const defaultId = '56cb91bdc3464f14678934ca';
  const defaultUser = {
    name: 'User name',
    email: 'default email',
    password: 'default password',
    role: 'default role',
  };
  const expectedUser = {
    __v: 0,
    _id: defaultId,
    name: 'User name',
    email: 'default email',
    password: 'default password',
    role: 'default role',
  };

  beforeEach(() => {
    const user = new User(defaultUser);
    /* eslint-disable no-underscore-dangle */
    user._id = defaultId;
    return User.remove({})
      .then(() => user.save());
  });

  afterEach(() => User.remove({}));

  describe('GET /users', () => {
    it('should return a list of users', (done) => {
      request
        .get('/users')
        .end((err, res) => {
          expect(res.body).to.eql([expectedUser]);
          done(err);
        });
    });

    context('when an id is specified', () => {
      it('should return 200 with one user', (done) => {
        request
          .get(`/users/${defaultId}`)
          .end((err, res) => {
            expect(res.statusCode).to.eql(200);
            expect(res.body).to.eql([expectedUser]);
            done(err);
          });
      });
    });
  });

  describe('POST /users', () => {
    context('when posting a user', () => {
      it('should return a new user with status code 201', (done) => {
        const customId = '56cb91bdc3464f14678934ba';
        const newUser = Object.assign({}, { _id: customId, __v: 0 }, defaultUser);
        const expectedSavedUser = {
          __v: 0,
          _id: customId,
          name: 'User name',
          email: 'default email',
          password: 'default password',
          role: 'default role',
        };
        request
          .post('/users')
          .send(newUser)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.body).to.eql(expectedSavedUser);
            done(err);
          });
      });
    });
  });

  describe('PUT /users/:id', () => {
    context('when editing a user', () => {
      it('should update the user and return 200 as status code', (done) => {
        const customUser = {
          name: 'Custom name',
        };
        const updateUser = Object.assign({}, customUser, defaultUser);

        request
          .put(`/users/${defaultId}`)
          .send(updateUser)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  });

  describe('DELETE /users/:id', () => {
    context('when deleting a user', () => {
      it('should delete a user and return 204 as status code', (done) => {
        request
          .delete(`/users/${defaultId}`)
          .end((err, res) => {
            expect(res.status).to.eql(204);
            done(err);
          });
      });
    });
  });
});
