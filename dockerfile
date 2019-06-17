FROM node:11-alpine

RUN apk update && apk add bash
RUN apk update && apk add --virtual build-dependenciess build-base gcc make git

RUN apk add --no-cache python && \
    python -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip install --upgrade pip setuptools && \
    rm -r /root/.cache

RUN echo -e '#!/bin/bash\n node /usr/src/app/node_modules/polymer-cli/bin/polymer.js $@' > /usr/bin/polymer && chmod +x /usr/bin/polymer

WORKDIR /usr/src/app

CMD /bin/bash