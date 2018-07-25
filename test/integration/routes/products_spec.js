import Product from '../../../src/models/product';

describe('Routes: Products', () => {
  let request;

  before(() => setupApp()
    .then((app) => {
      request = supertest(app);
    }));

  const defaultId = '56cb91bdc3464f14678934ca';
  const defaultProduct = {
    name: 'Default product',
    description: 'product description',
    price: 100,
  };
  const expectedProduct = {
    __v: 0,
    _id: defaultId,
    name: 'Default product',
    description: 'product description',
    price: 100,
  };

  beforeEach(() => {
    const product = new Product(defaultProduct);
    /* eslint-disable no-underscore-dangle */
    product._id = '56cb91bdc3464f14678934ca';
    return Product.remove({})
      .then(() => product.save());
  });

  afterEach(() => Product.remove({}));

  describe('GET /products', () => {
    it('should return a list of products', (done) => {
      request
        .get('/products')
        .end((err, res) => {
          expect(res.body).to.eql([expectedProduct]);
          done(err);
        });
    });
  });

  context('when an id is specified', () => {
    it('should return 200 with one product', (done) => {
      request
        .get(`/products/${defaultId}`)
        .end((err, res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.body).to.eql([expectedProduct]);
          done(err);
        });
    });
  });
});
