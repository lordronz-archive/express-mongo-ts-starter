import httpStatus from 'http-status';
import request from 'supertest';

import app from '../../src/app';
import config from '../../src/config/config';

describe('Auth routes', () => {
  describe('GET /v1/docs', () => {
    // eslint-disable-next-line jest/expect-expect
    test('should return 404 when running in production', async () => {
      config.env = 'production';
      await request(app).get('/v1/docs').send().expect(httpStatus.NOT_FOUND);
      config.env = process.env.NODE_ENV;
    });
  });
});
