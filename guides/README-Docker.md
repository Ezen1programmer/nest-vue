# Docker Install

```shell
brew install --cask docker
```

## docker-compose

By default, services are privately exposed only to other Docker services on `app_network`. If public access to services is needed, use `ports` in place of `networks`.

## Initial Setup - Secrets

-   SSL certs + Diffie-Hellman pem

## Initial Setup - .env

-   NGINX_DH_BITS: `nginx.conf` prefers ECDHE (requires modern devices), but DHE is supported for some older devices. 2048 bits is likely sufficient until year 2030 and [considered "Acceptabe" by US NIST](https://csrc.nist.gov/publications/detail/sp/800-131a/rev-2/final), particularly for HTTPS/TLS connections that are renewed <= 2 years. Bits can be changed to 3072, 4096, or higher, but there is diminishing return on improved security and exponential time required to generate. As modern devices are adopted, more efficient and faster elliptical curve cryptography like ECDHE should be preferred.

## NGINX

Serves frontend and static files for optimal performance, but routes non-static traffic to backend. Pre-configured to easily implement load balancing across multiple backend application instances.

### Initial setup

-   Generate SSL
-   Generate Diffie-Hellman: the first time the nginx image is built, dhparams are generated with openssl and can take several minutes. This step is cached for future image builds, even if nginx.conf or static files are updated because they are separate layers.

### nginx.conf

`${VAR}` environment variables are managed in the `.env` file at the project root.

This file is copied to `/etc/nginx/templates` as `nginx.conf.template` during Docker image build to interpolate variables and output `nginx.conf` to `/etc/nginx/nginx.conf`

See https://hub.docker.com/_/nginx - "Using environment variables" (requires nginx@^1.19)

Sources:

-   https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04
-   https://www.nginx.com/resources/wiki/start/topics/examples/full/
-   https://gist.github.com/nishantmodak/d08aae033775cb1a0f8a
-   https://wiki.mozilla.org/Security/Archive/Server_Side_TLS_4.0
-   https://ssl-config.mozilla.org/#server=nginx

## CERTBOT

Sources:

-   https://gist.github.com/cecilemuller/9492b848eb8fe46d462abeb26656c4f8
