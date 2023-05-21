FROM mysql:latest as builder

ENV MYSQL_ROOT_PASSWORD password

COPY ./init.sql /docker-entrypoint-initdb.d

RUN sed -i 's/exec "$@"//g' /usr/local/bin/docker-entrypoint.sh
RUN mkdir -p /var/lib/mysql_tmp
RUN docker-entrypoint.sh mysqld --datadir /var/lib/mysql_tmp

FROM mysql:latest as release

ENV MYSQL_ROOT_PASSWORD password

COPY --from=builder /var/lib/mysql_tmp /var/lib/mysql
