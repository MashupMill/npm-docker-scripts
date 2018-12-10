#!/usr/bin/env node

import docker from './index';

docker(process.argv).catch(e => {
    const status = e && e.status;
    console.error("Failed to run", e);
    process.exit(status || 1);
});
