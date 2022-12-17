FROM mysql:latest

ENV HOSTNAME "db_mysql"
ENV MYSQL_ROOT_PASSWORD "ed43q26843as4d328"

ADD /init/01-databases.sql /docker-entrypoint-initdb.d/
RUN chmod -R 775 /docker-entrypoint-initdb.d
VOLUME ["/docker-entrypoint-initdb.d"]

EXPOSE 3306

# CMD ["mysqld"]