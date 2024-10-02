import { registerAs } from '@nestjs/config';

export default registerAs('api', () => ({
  prefix: process.env.API_PREFIX || '',
  key: {
    enabled: process.env.API_KEY_ENABLED === 'true',
    name: process.env.API_KEY_NAME || 'x-api-key',
    prefix: process.env.API_KEY_PREFIX || '',
    value: process.env.API_KEY_VALUE || '',
  },
  doc: {
    enabled: process.env.API_DOC_ENABLED === 'true',
    path: process.env.API_DOC_PATH || '/docs',
    user: process.env.API_DOC_USER || 'developer',
    pwd: process.env.API_DOC_PWD || 'q1w2e3r4t5',
  },
}));
